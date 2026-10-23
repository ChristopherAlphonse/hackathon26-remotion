"""Synthesises the sound for the "Runway Rebels presents" intro (public/sfx/intro.wav).

Timeline (seconds, matches src/TwoClocks/Intro.tsx):
  0.6-2.0  a rising shimmer that builds toward the title
  2.0      a deep cinematic hit as the title lands
  3.4      a soft airy swell under "presents"
  6.0-7.0  fade to silence

Needs numpy only:  python3 scripts/make-intro-sfx.py
"""
import wave

import numpy as np

SR = 48000
DUR = 7.0
t = np.arange(int(SR * DUR)) / SR
rng = np.random.default_rng(7)


def ramp(x, a, b):
    """0 before a, 1 after b, smooth between."""
    u = np.clip((x - a) / (b - a), 0, 1)
    return u * u * (3 - 2 * u)


def hp(x):
    """Cheap high-pass: first difference."""
    return np.diff(x, prepend=0)


def lp(x, n):
    """Moving-average low-pass."""
    return np.convolve(x, np.ones(n) / n, mode="same")


# 1. riser: an exponential chirp plus bright noise, swelling up to the hit
rise_env = ramp(t, 0.6, 1.98) ** 2 * (t < 2.0)
f = 140 * (2600 / 140) ** np.clip((t - 0.6) / 1.4, 0, 1)
phase = 2 * np.pi * np.cumsum(f) / SR
chirp = (np.sin(phase) + 0.5 * np.sin(2 * phase) + 0.25 * np.sin(3 * phase)) * rise_env * 0.22
noise = hp(rng.standard_normal(len(t))) * rise_env * 0.16

# 2. the hit at 2.0: a falling sub tone, a low thud of noise, and a glassy shimmer
th = np.clip(t - 2.0, 0, None)
hit_on = t >= 2.0
sub_f = 38 + 60 * np.exp(-th / 0.18)
sub = np.sin(2 * np.pi * np.cumsum(sub_f) / SR) * np.exp(-th / 0.9) * hit_on * 0.95
thud = lp(rng.standard_normal(len(t)), 90) * np.exp(-th / 0.22) * hit_on * 3.0
shimmer = sum(np.sin(2 * np.pi * fr * t) for fr in (880, 1318.5, 1760)) * np.exp(-th / 1.6) * hit_on * 0.03

# 3. a soft swell under "presents"
swell_env = np.exp(-(((t - 3.7) / 0.45) ** 2))
swell = lp(hp(rng.standard_normal(len(t))), 6) * swell_env * 0.12

mono = chirp + noise + sub + thud + shimmer + swell
mono *= 1 - ramp(t, 6.0, 7.0)  # fade out
mono /= np.abs(mono).max() / 0.8

# a touch of stereo width: delay one side by a hair
left = mono
right = np.roll(mono, 90) * 0.97
stereo = np.stack([left, right], axis=1)
pcm = (np.clip(stereo, -1, 1) * 32767).astype("<i2")

with wave.open("public/sfx/intro.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote public/sfx/intro.wav", round(len(t) / SR, 2), "s")

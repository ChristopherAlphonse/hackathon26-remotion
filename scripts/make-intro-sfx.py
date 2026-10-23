"""Synthesises the sound for the "Runway Rebels presents" intro (public/sfx/intro.wav).

Every brick gets its own little story, timed to the animation in src/TwoClocks/Intro.tsx:
  - a rising whistle while it falls (it stretches and speeds up on screen),
  - a wooden clack with a low thump when it lands, panned to where it sits in the wall,
  - two quieter taps as it bounces (the animation bounces at ~0.21s and ~0.42s after landing).
The finished wall gets one deeper accent, "presents" gets two soft plucks, and the bricks tumbling away each get a swish.

Landing/exit times must match src/TwoClocks/Intro.tsx (ROWS, FALL, the 0.14s stagger, the 5.8s exit).

Needs numpy only:  python3 scripts/make-intro-sfx.py
"""
import wave

import numpy as np

SR = 48000
DUR = 7.0
n = int(SR * DUR)
t = np.arange(n) / SR
rng = np.random.default_rng(11)

FALL = 0.45
STAGGER = 0.14
COLS = 6
ROWS = [(0.8, 0), (2.0, 1)]  # (start of row, row index: 0 = bottom REBELS, 1 = top RUNWAY)
EXIT_AT = 5.8


def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same")


def hp(x, k):
    return x - lp(x, k)


out = np.zeros((2, n))


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    m = min(len(sig), n - i)
    if m <= 0:
        return
    a = (pan + 1) * np.pi / 4  # equal-power pan, -1 left .. +1 right
    out[0, i : i + m] += sig[:m] * gain * np.cos(a) * np.sqrt(2)
    out[1, i : i + m] += sig[:m] * gain * np.sin(a) * np.sqrt(2)


def whistle(dur):
    """A brick cutting through the air: pitch and level rise toward the impact."""
    k = np.arange(int(dur * SR)) / SR
    u = k / dur
    freq = 380 + 1500 * u**2
    tone = np.sin(2 * np.pi * np.cumsum(freq) / SR)
    air = hp(rng.standard_normal(len(k)), 24) * 0.5
    return (tone * 0.5 + air) * u**2.5 * np.clip((dur - k) / 0.01, 0, 1)


def impact(base, bright=1.0, length=0.45):
    """Wood block hitting wood: a few inharmonic damped modes, a low thump, a sharp transient, a scuff."""
    k = np.arange(int(length * SR)) / SR
    body = np.zeros(len(k))
    for ratio, amp, decay in ((1.0, 0.9, 0.09), (2.32, 0.55, 0.05), (3.9, 0.3, 0.03), (5.7, 0.15, 0.02)):
        body += amp * np.sin(2 * np.pi * base * ratio * k) * np.exp(-k / decay)
    thump = np.sin(2 * np.pi * np.cumsum(55 + 70 * np.exp(-k / 0.04)) / SR) * np.exp(-k / 0.12)
    tick = hp(rng.standard_normal(len(k)), 8) * np.exp(-k / 0.003) * 0.9 * bright
    scuff = lp(rng.standard_normal(len(k)), 30) * np.exp(-k / 0.06) * 0.6
    return body * 0.55 + thump * 0.9 + tick + scuff


landings = 0
for start, row in ROWS:
    for col in range(COLS):
        land = start + col * STAGGER + FALL
        pan = (col - 2.5) / 2.5 * 0.55
        add(whistle(FALL), land - FALL, 0.16, pan)
        base = (165 + col * 11) * (1.3 if row else 1.0)  # the top row is lighter and clackier
        add(impact(base, 1.0 + 0.4 * row), land, 0.5, pan)
        add(impact(base * 1.15, 0.5, 0.2), land + 0.209, 0.14, pan)  # first bounce
        add(impact(base * 1.25, 0.4, 0.15), land + 0.419, 0.05, pan)  # second bounce
        landings += 1

# the wall is finished: one deeper, longer accent on the last brick of the top row
k = np.arange(int(1.4 * SR)) / SR
boom = np.sin(2 * np.pi * np.cumsum(48 + 60 * np.exp(-k / 0.08)) / SR) * np.exp(-k / 0.45)
add(boom, 2.0 + 5 * STAGGER + FALL, 0.55)

# "presents": a short upward sweep, then two soft plucks (G5 then D6) as the word and its underline are lettered in
sweep_t = np.arange(int(0.35 * SR)) / SR
sweep = np.sin(2 * np.pi * np.cumsum(600 + 1800 * (sweep_t / 0.35) ** 2) / SR) * (sweep_t / 0.35) ** 2
add(sweep, 3.2, 0.06)
p = np.arange(int(1.2 * SR)) / SR
for at, fr in ((3.55, 784.0), (3.78, 1174.7)):
    pluck = (np.sin(2 * np.pi * fr * p) + 0.35 * np.sin(2 * np.pi * 2 * fr * p)) * np.exp(-p / 0.35) * (1 - np.exp(-p / 0.004))
    add(pluck, at, 0.16)

# the bricks tumble away: one swish per brick, top row first, left to right (same order as the animation)
w = np.arange(int(0.55 * SR)) / SR
for row in (1, 0):
    for col in range(COLS):
        at = EXIT_AT + (0 if row == 1 else 0.12) + col * 0.05
        swish = lp(rng.standard_normal(len(w)), 60) * np.sin(np.pi * np.clip(w / 0.5, 0, 1)) ** 2 * 3.0
        add(swish, at, 0.12, (col - 2.5) / 2.5 * 0.55)

out *= np.clip((DUR - t) / 0.5, 0, 1)  # last half second fades out
out = np.tanh(out * 1.4)  # soft-limit the loudest hits instead of letting them dictate the level
out /= np.abs(out).max() / 0.8

pcm = (np.clip(out.T, -1, 1) * 32767).astype("<i2")
with wave.open("public/sfx/intro.wav", "wb") as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())
print("wrote public/sfx/intro.wav", DUR, "s,", landings, "brick landings")

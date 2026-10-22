import { Composition, Still } from "remotion";
import { myCompSchema, PreviewCard } from "./PreviewCard";
import { Pitch, PITCH_DURATION, PITCH_FPS } from "./Pitch";
import { TwoClocks, TWO_CLOCKS_FPS, TWO_CLOCKS_FRAMES } from "./TwoClocks/TwoClocks";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="PreviewCard"
        component={PreviewCard}
        width={1200}
        height={627}
        schema={myCompSchema}
        defaultProps={{
          title: "Welcome to Remotion" as const,
          description: "Edit Video.tsx to change template" as const,
          color: "#0B84F3" as const,
        }}
      />
      <Composition
        id="Pitch"
        component={Pitch}
        durationInFrames={PITCH_DURATION}
        fps={PITCH_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="TwoClocks"
        component={TwoClocks}
        durationInFrames={TWO_CLOCKS_FRAMES}
        fps={TWO_CLOCKS_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

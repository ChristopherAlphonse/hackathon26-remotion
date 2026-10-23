import { Composition } from "remotion";
import { TwoClocks, TWO_CLOCKS_FPS, TWO_CLOCKS_FRAMES } from "./TwoClocks/TwoClocks";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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

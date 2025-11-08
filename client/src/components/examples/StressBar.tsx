import StressBar from "../StressBar";

export default function StressBarExample() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-md">
      <StressBar level={25} />
      <StressBar level={55} />
      <StressBar level={85} />
    </div>
  );
}

import ConfidenceRing from "../ConfidenceRing";

export default function ConfidenceRingExample() {
  return (
    <div className="flex gap-8 p-8">
      <ConfidenceRing confidence={85} size={100} />
      <ConfidenceRing confidence={92} size={120} />
    </div>
  );
}

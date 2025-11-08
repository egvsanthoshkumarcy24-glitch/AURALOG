import LogCard from "../LogCard";

export default function LogCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 max-w-4xl">
      <LogCard
        date={Date.now() - 86400000}
        emotion="calm"
        type="video"
        duration={180}
        onClick={() => console.log("Video log clicked")}
      />
      <LogCard
        date={Date.now() - 172800000}
        emotion="happy"
        type="voice"
        duration={240}
        snippet="Today was a great day! I felt very productive and accomplished a lot of my goals."
        onClick={() => console.log("Voice log clicked")}
      />
    </div>
  );
}

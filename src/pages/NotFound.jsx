import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <Compass size={38} className="text-moss-400 mb-5" />
      <h1 className="font-display text-3xl text-mist-100 mb-2">Off the map</h1>
      <p className="text-mist-400 font-body mb-8">This trail doesn't exist. Let's get you back on route.</p>
      <Button as={Link} to="/">Back to Home</Button>
    </div>
  );
}

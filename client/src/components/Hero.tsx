import { Aurora} from "./ui/Aurora";

const Hero = () => {
    return (
        <div className="hidden lg:flex h-full w-1/2 flex-col items-center justify-center bg-customGrey relative">
            <div className="p-5">
            <Aurora />
                <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground no-underline">
                    FFmpeg<span className="text-primary-foreground"> Command Helper</span>
                </h1>
                <h3 className="text-xl text-primary-foreground mt-2">
                    Help for you in processing audio and video files
                </h3>
            </div>
        </div>
    );
};

export default Hero;

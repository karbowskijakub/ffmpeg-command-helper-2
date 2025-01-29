import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConsoleProps } from "@/interfaces/Console";
import { Button } from "./ui/button";

const formSchema = z.object({
  fromCut: z.number({
    invalid_type_error: "Bitrate must be a number.",
    required_error: "Please select or enter a bitrate.",
  }),
  toCut: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  duration: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  bitRateAudio: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  bitRateVideo: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  frameRate: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  audioCodec: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  videoCodec: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  FilePathInput: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  FilePathOutput: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  InputFileFormat: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  OutputFileFormat: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  resolution: z.string().min(1, {
    message: "File path 2 is required.",
  }),

  isCustomBitRateAudio: z.boolean().default(false).optional(),
  isCustomBitRateVideo: z.boolean().default(false).optional(),
  isCustomFrameRate: z.boolean().default(false).optional(),
  isCustomAudioCodec: z.boolean().default(false).optional(),
  isCustomVideoCodec: z.boolean().default(false).optional(),
  isTranscodingConversion: z.boolean().default(false).optional(),
  isCutAudioAndVideo: z.boolean().default(false).optional(),
});

const Console = ({ setWatchedFields }: ConsoleProps) => {
  const [showCustomBitRateAudio, setShowCustomBitRateAudio] = useState(false);
  const [showCustomBitRateVideo, setShowCustomBitRateVideo] = useState(false);
  const [showCustomFrameRate, setShowCustomFrameRate] = useState(false);
  const [showCustomAudioCodec, setShowCustomAudioCodec] = useState(false);
  const [showCustomVideoCodec, setShowCustomVideoCodec] = useState(false);
  const [LastChoosedCustomBitRateAudio, setLastChoosedCustomBitRateAudio] =
    useState(0);
  const [LastChoosedCustomBitRateVideo, setLastChoosedCustomBitRateVideo] =
    useState(0);
  const [LastChoosedCustomFrameRate, setLastChoosedCustomFrameRate] =
    useState(0);
  const [LastChoosedCustomAudioCodec, setLastChoosedCustomAudioCodec] =
    useState("");
  const [LastChoosedCustomVideoCodec, setLastChoosedCustomVideoCodec] =
    useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FilePathInput: "",
      FilePathOutput: "",
      InputFileFormat: "",
      OutputFileFormat: "",
      isCustomBitRateAudio: false,
      isCustomBitRateVideo: false,
      isCustomFrameRate: false,
      isCustomAudioCodec: false,
      isTranscodingConversion: false,
      isCutAudioAndVideo: false,
    },
  });
  const watchAllFields = form.watch();
  const isTranscodingConversion = watchAllFields.isTranscodingConversion;
  const isCutAudioAndVideo = watchAllFields.isCutAudioAndVideo;
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const currentValues = form.getValues();
  const setFormDefault = () => {
    form.reset({
      FilePathInput: currentValues.FilePathInput,
      FilePathOutput: currentValues.FilePathOutput,
      InputFileFormat: currentValues.InputFileFormat,
      OutputFileFormat: currentValues.OutputFileFormat,
      isCustomBitRateAudio: false,
      isCustomBitRateVideo: false,
      isCustomFrameRate: false,
      isCustomAudioCodec: false,
      isTranscodingConversion: false,
      isCutAudioAndVideo: false,
    });
    setShowCustomBitRateAudio(false);
    setShowCustomBitRateVideo(false);
    setShowCustomFrameRate(false);
    setShowCustomAudioCodec(false);
    setShowCustomVideoCodec(false);
    setLastChoosedCustomFrameRate(0);
  };

  useEffect(() => {
    setWatchedFields(watchAllFields);
  }, [watchAllFields, setWatchedFields]);

  return (
    <div className="flex w-full h-3/5 justify-center mb-10 ">
      <div className="mt-10 mx-10 w-full h-full lg:w-5/6 lg:max-h-3/5 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:p-5  flex flex-col lg:flex-row h-full "
          >
            <div className="bg-secondary text-secondary-foreground h-full w-full lg:w-1/4 p-4">
              <FormField
                control={form.control}
                name="FilePathInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Filepath</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FilePathOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Filepath</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="InputFileFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input File format (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="OutputFileFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output File format (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center items-center">
                <Button type="button" className="mt-5 mb-5" onClick={setFormDefault}>
                  Delete except input, output
                </Button>
              </div>
            </div>

            <div className="text-secondary-foreground max-h-full lg:max-h-[450px] xxl:max-h-[600px] w-full lg:w-2/4 ">
              <FormField
                control={form.control}
                name="isTranscodingConversion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={isCutAudioAndVideo}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            setFormDefault();
                            form.setValue("isTranscodingConversion", true);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Transcoding, type conversion</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {isTranscodingConversion && (
                <ScrollArea className="h-full p-5">
                  <FormField
                    control={form.control}
                    name="audioCodec"
                    render={({ field }) => (
                      <FormItem className="mx-2">
                        <FormLabel>Choose Audio Codec</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            let stringValue = value;
                            if (stringValue === "default") {
                              stringValue = "";
                            }
                            field.onChange(stringValue);
                            setLastChoosedCustomAudioCodec(stringValue);
                          }}
                          defaultValue={field.value?.toString()}
                          disabled={showCustomAudioCodec}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an audio codec" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">
                              Without audio codec
                            </SelectItem>
                            <SelectItem value="mp3">MP3</SelectItem>
                            <SelectItem value="aac">AAC</SelectItem>
                            <SelectItem value="flac">FLAC</SelectItem>
                            <SelectItem value="ogg">OGG</SelectItem>
                            <SelectItem value="wav">WAV</SelectItem>
                            <SelectItem value="opus">Opus</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isCustomAudioCodec"
                    render={({ field }) => (
                      <FormItem className="mt-5 mx-2">
                        <FormLabel className="mr-3">
                          Custom Audio Codec
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              const isChecked = checked === true;
                              if (!isChecked) {
                                form.setValue(
                                  "audioCodec",
                                  LastChoosedCustomAudioCodec
                                );
                              }
                              field.onChange(isChecked);
                              setShowCustomAudioCodec(isChecked);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {showCustomAudioCodec && (
                    <FormField
                      control={form.control}
                      name="audioCodec"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Custom Audio Codec</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="videoCodec"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel>Choose Video Codec</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            let stringValue = value;
                            if (stringValue === "default") {
                              stringValue = "";
                            }
                            field.onChange(stringValue);
                            setLastChoosedCustomVideoCodec(stringValue);
                          }}
                          defaultValue={field.value?.toString()}
                          disabled={showCustomVideoCodec}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a video codec" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">
                              Without video codec
                            </SelectItem>
                            <SelectItem value="libx264">H.264</SelectItem>
                            <SelectItem value="libx265">H.265</SelectItem>
                            <SelectItem value="libx266">H.266</SelectItem>
                            <SelectItem value="libvpx">VP8</SelectItem>
                            <SelectItem value="libvpx-vp9">VP9</SelectItem>
                            <SelectItem value="libaom-av1">AV1</SelectItem>
                            <SelectItem value="mpeg4">MPEG-4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isCustomVideoCodec"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel className="mr-3">
                          Custom Video Codec
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              const isChecked = checked === true;
                              if (!isChecked) {
                                form.setValue(
                                  "videoCodec",
                                  LastChoosedCustomVideoCodec
                                );
                              }
                              field.onChange(isChecked);
                              setShowCustomVideoCodec(isChecked);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {showCustomVideoCodec && (
                    <FormField
                      control={form.control}
                      name="videoCodec"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Custom Video Codec</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="bitRateAudio"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel>Choose Bitrate Audio</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            let stringValue = value;
                            if (stringValue === "default") {
                              stringValue = "";
                            }
                            const numericValue = Number(stringValue);
                            field.onChange(numericValue);
                            setLastChoosedCustomBitRateAudio(numericValue);
                          }}
                          defaultValue={field.value?.toString()}
                          disabled={showCustomBitRateAudio}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a bitrate you want" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">
                              Default value
                            </SelectItem>
                            <SelectItem value="128">128 kbps</SelectItem>
                            <SelectItem value="192">192 kbps</SelectItem>
                            <SelectItem value="256">256 kbps</SelectItem>
                            <SelectItem value="320">320 kbps</SelectItem>
                            <SelectItem value="1000">1 Mbps</SelectItem>
                            <SelectItem value="2500">2.5 Mbps</SelectItem>
                            <SelectItem value="5000">5 Mbps</SelectItem>
                            <SelectItem value="10000">10 Mbps</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isCustomBitRateAudio"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel className="mr-3">
                          Custom bitrate Audio
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              const isChecked = checked === true;
                              if (!isChecked) {
                                form.setValue(
                                  "bitRateAudio",
                                  LastChoosedCustomBitRateAudio
                                );
                              }

                              field.onChange(isChecked);
                              setShowCustomBitRateAudio(isChecked);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {showCustomBitRateAudio && (
                    <FormField
                      control={form.control}
                      name="bitRateAudio"
                      render={({ field }) => (
                        <FormItem className=" mx-2">
                          <FormLabel>
                            Enter Custom Bit Rate Audio (kbps)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="bitRateVideo"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel>Choose Bitrate Video</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            let stringValue = value;
                            if (stringValue === "default") {
                              stringValue = "";
                            }
                            const numericValue = Number(stringValue);
                            field.onChange(numericValue);
                            setLastChoosedCustomBitRateVideo(numericValue);
                          }}
                          defaultValue={field.value?.toString()}
                          disabled={showCustomBitRateVideo}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a bitrate you want" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">
                              Default value
                            </SelectItem>
                            <SelectItem value="128">128 kbps</SelectItem>
                            <SelectItem value="192">192 kbps</SelectItem>
                            <SelectItem value="256">256 kbps</SelectItem>
                            <SelectItem value="320">320 kbps</SelectItem>
                            <SelectItem value="1000">1 Mbps</SelectItem>
                            <SelectItem value="2500">2.5 Mbps</SelectItem>
                            <SelectItem value="5000">5 Mbps</SelectItem>
                            <SelectItem value="10000">10 Mbps</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isCustomBitRateVideo"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel className="mr-3">
                          Custom bitrate Video
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              const isChecked = checked === true;
                              if (!isChecked) {
                                form.setValue(
                                  "bitRateVideo",
                                  LastChoosedCustomBitRateVideo
                                );
                              }

                              field.onChange(isChecked);
                              setShowCustomBitRateVideo(isChecked);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {showCustomBitRateVideo && (
                    <FormField
                      control={form.control}
                      name="bitRateVideo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Enter Custom Bit Rate Video (kbps)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="frameRate"
                    render={({ field }) => (
                      <FormItem className="mt-5 mx-2">
                        <FormLabel>Choose Frame Rate</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const numericValue = Number(value);
                            field.onChange(numericValue);
                            setLastChoosedCustomFrameRate(numericValue);
                          }}
                          defaultValue={field.value?.toString()}
                          disabled={showCustomFrameRate}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a frame rate you want" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="24">24 fps</SelectItem>
                            <SelectItem value="30">30 fps</SelectItem>
                            <SelectItem value="60">60 fps</SelectItem>
                            <SelectItem value="120">120 fps</SelectItem>
                            <SelectItem value="240">240 fps</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isCustomFrameRate"
                    render={({ field }) => (
                      <FormItem className="mt-5 mx-2">
                        <FormLabel className="mr-3">
                          Custom frame rate
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              const isChecked = checked === true;
                              if (!isChecked) {
                                form.setValue(
                                  "frameRate",
                                  LastChoosedCustomFrameRate
                                );
                              }

                              field.onChange(isChecked);
                              setShowCustomFrameRate(isChecked);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {showCustomFrameRate && (
                    <FormField
                      control={form.control}
                      name="frameRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Custom Frame Rate (kbps)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="resolution"
                    render={({ field }) => (
                      <FormItem className="mt-5 mx-2">
                        <FormLabel>Choose Resolution</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a resolution" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="640x360">
                              640x360 (360p)
                            </SelectItem>
                            <SelectItem value="720x480">
                              720x480 (480p)
                            </SelectItem>
                            <SelectItem value="720x576">
                              720x576 (576p)
                            </SelectItem>
                            <SelectItem value="1280x720">
                              1280x720 (720p)
                            </SelectItem>
                            <SelectItem value="1920x1080">
                              1920x1080 (1080p)
                            </SelectItem>
                            <SelectItem value="2560x1440">
                              2560x1440 (1440p)
                            </SelectItem>
                            <SelectItem value="3840x2160">
                              3840x2160 (4K)
                            </SelectItem>
                            <SelectItem value="7680x4320">
                              7680x4320 (8K)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="mt-5 mx-2">
                        <FormLabel>Type duration</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          <div>
                            <strong>e.g. 00:10:20</strong>
                          </div>
                          <div>The audio/video file will last 00:10:00</div>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ScrollArea>
              )}
            </div>

            <div className="text-secondary-foreground h-full w-full lg:w-2/4 ">
              <FormField
                control={form.control}
                name="isCutAudioAndVideo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4  lg:mx-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={isTranscodingConversion}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            setFormDefault();
                            form.setValue("isCutAudioAndVideo", true);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Cut and copy video, audio file</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {isCutAudioAndVideo && (
                <div>
                  <FormField
                    control={form.control}
                    name="fromCut"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel>
                          Enter the moment from which you want to cut
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          <div>
                            <strong>e.g. 00:10:20</strong>
                          </div>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="toCut"
                    render={({ field }) => (
                      <FormItem className="mt-5  mx-2">
                        <FormLabel>
                          Enter the moment to which you want to cut
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          <div>
                            <strong>e.g. 00:10:40</strong>
                          </div>
                          <div>
                            The copied audio/video file will last 00:00:20
                          </div>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Console;

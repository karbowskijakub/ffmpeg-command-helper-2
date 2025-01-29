export interface Form {
    FilePathInput: string;
    FilePathOutput: string;
    InputFileFormat: string;
    OutputFileFormat: string;
    bitRateAudio: number;
    bitRateVideo: number;
    frameRate: number;
    audioCodec: string;
    videoCodec: string;
    fromCut: number;
    toCut: number;
    duration: number;
    resolution: string;
    isCustomBitRateAudio?: boolean;
    isCustomBitRateVideo?: boolean;
    isCustomFrameRate?: boolean;
    isCustomAudioCodec?: boolean;
    isCustomVideoCodec?: boolean;
    isTranscodingConversion?: boolean;
    isCutAudioAndVideo?: boolean;
  }
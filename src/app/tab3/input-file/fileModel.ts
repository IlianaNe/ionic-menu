export interface FileRecord {
    url?: string;
    name?: string;
    size?: number;
    type?: string;
    isUploading?: boolean;
    isDeleting?: boolean;
    brFile?: any;
    modelFile?: any;
    indexPlace?: number;
  }
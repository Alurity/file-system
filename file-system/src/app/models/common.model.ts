export interface FileModel {
    name: string;
    filePath?: string;
    children?: FileModel[];
    isOpen?: boolean;
    isHide: boolean;
    type: FileType;
}

export enum FileType {
    Folder,
    File
}

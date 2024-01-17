export interface FileModel {
    name: string;
    filePath?: string;
    children?: FileModel[];
    isOpen: boolean;
    isHide: boolean;
}

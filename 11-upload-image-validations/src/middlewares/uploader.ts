import { join } from "path";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../../public");

  const storage = multer.diskStorage({
    destination(req, file: Express.Multer.File, callback: DestinationCallback) {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      callback(null, destination);
    },
    filename(req, file: Express.Multer.File, callback: FileNameCallback) {
      const originalNameParts = file.originalname.split(".");
      const fileExtension = originalNameParts[originalNameParts.length - 1];

      if (!["jpg", "png", "jpeg"].includes(fileExtension)) {
        return callback(null, "Only jpg, png, and jpeg files are allowed");
      }

      const newFileName = filePrefix + Date.now() + "." + fileExtension;
      callback(null, newFileName);
    },
  });

  return multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });
};

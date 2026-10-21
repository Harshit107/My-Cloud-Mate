import useStorageUploader from "./useStorageUploader";
import useCloudflareUploader from "./providers/useCloudflareUploader";
import useFirebaseUploader from "./providers/useFirebaseUploader";
import { ACTIVE_STORAGE_PROVIDER, STORAGE_PROVIDERS } from "../config";

export {
  useStorageUploader,
  useCloudflareUploader,
  useFirebaseUploader,
  ACTIVE_STORAGE_PROVIDER,
  STORAGE_PROVIDERS,
};

export default useStorageUploader;

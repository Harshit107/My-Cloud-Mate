import { ACTIVE_STORAGE_PROVIDER, STORAGE_PROVIDERS } from "../config";
import useCloudflareUploader from "./providers/useCloudflareUploader";
import useFirebaseUploader from "./providers/useFirebaseUploader";

/**
 * Unified Storage Provider Switch Hook
 * Routes uploads to the configured provider: Cloudflare R2 or Firebase
 */
export default function useStorageUploader() {
  const cloudflareUploader = useCloudflareUploader();
  const firebaseUploader = useFirebaseUploader();

  if (ACTIVE_STORAGE_PROVIDER === STORAGE_PROVIDERS.CLOUDFLARE) {
    return cloudflareUploader;
  }

  return firebaseUploader;
}

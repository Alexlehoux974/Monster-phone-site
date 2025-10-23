/**
 * Google Drive Helper Functions
 *
 * Utilities for constructing and managing Google Drive image URLs
 * for product content sections.
 */

/**
 * Construct a Google Drive image URL from brand, product, variant, and filename
 *
 * @param brand - Brand name (e.g., "Nokia", "Honor")
 * @param product - Product name (e.g., "110 4G 2025", "200 Pro")
 * @param variant - Variant name (e.g., "Bleu", "Noir") - optional
 * @param filename - Image filename (e.g., "image-1.jpg")
 * @returns Full Google Drive URL
 *
 * @example
 * getGoogleDriveImageUrl("Nokia", "110 4G 2025", "Bleu", "image-1.jpg")
 * // Returns: "https://drive.google.com/uc?export=view&id=..."
 */
export function getGoogleDriveImageUrl(
  brand: string,
  product: string,
  variant: string | null,
  filename: string
): string {
  // For now, return a placeholder that users can manually replace
  // Future enhancement: Integrate with Google Drive API for file browser
  const path = variant
    ? `${brand}/${product}/${variant}/${filename}`
    : `${brand}/${product}/${filename}`;

  // Placeholder format - users should replace with actual Google Drive file ID
  return `https://drive.google.com/uc?export=view&id=REPLACE_WITH_FILE_ID_FOR_${encodeURIComponent(path)}`;
}

/**
 * Extract file ID from Google Drive URL
 *
 * @param url - Google Drive URL (various formats)
 * @returns File ID or null if invalid
 *
 * @example
 * extractGoogleDriveFileId("https://drive.google.com/file/d/1ABC123/view")
 * // Returns: "1ABC123"
 */
export function extractGoogleDriveFileId(url: string): string | null {
  // Handle various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,  // /file/d/FILE_ID/view
    /id=([a-zA-Z0-9_-]+)/,          // uc?export=view&id=FILE_ID
    /\/d\/([a-zA-Z0-9_-]+)/,        // /d/FILE_ID/preview
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convert Google Drive sharing URL to direct download URL
 *
 * @param url - Google Drive sharing URL
 * @returns Direct download URL for use in img src
 *
 * @example
 * convertToDirectDownloadUrl("https://drive.google.com/file/d/1ABC123/view?usp=sharing")
 * // Returns: "https://drive.google.com/uc?export=view&id=1ABC123"
 */
export function convertToDirectDownloadUrl(url: string): string {
  const fileId = extractGoogleDriveFileId(url);

  if (!fileId) {
    // If we can't extract file ID, return original URL
    return url;
  }

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Validate if a URL is a Google Drive URL
 *
 * @param url - URL to validate
 * @returns True if URL is from Google Drive
 *
 * @example
 * isGoogleDriveUrl("https://drive.google.com/file/d/1ABC123/view")
 * // Returns: true
 */
export function isGoogleDriveUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.includes('drive.google.com');
  } catch {
    return false;
  }
}

/**
 * Get file extension from URL or filename
 *
 * @param urlOrFilename - URL or filename
 * @returns File extension (lowercase, without dot)
 *
 * @example
 * getFileExtension("image.jpg") // Returns: "jpg"
 * getFileExtension("https://example.com/photo.PNG") // Returns: "png"
 */
export function getFileExtension(urlOrFilename: string): string {
  const parts = urlOrFilename.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
}

/**
 * Validate image file extension
 *
 * @param urlOrFilename - URL or filename
 * @returns True if extension is a valid image format
 */
export function isValidImageExtension(urlOrFilename: string): boolean {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'];
  const ext = getFileExtension(urlOrFilename);
  return validExtensions.includes(ext);
}

/**
 * Batch validate Google Drive URLs
 *
 * @param urls - Array of URLs to validate
 * @returns Object with valid and invalid URLs
 */
export function validateGoogleDriveUrls(urls: string[]): {
  valid: string[];
  invalid: string[];
} {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const url of urls) {
    if (isGoogleDriveUrl(url)) {
      valid.push(url);
    } else {
      invalid.push(url);
    }
  }

  return { valid, invalid };
}

/**
 * Get Google Drive folder URL from base folder ID
 *
 * @param folderId - Google Drive folder ID
 * @returns Folder URL
 */
export function getGoogleDriveFolderUrl(folderId: string): string {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

/**
 * Constants for Google Drive integration
 */
export const GOOGLE_DRIVE_CONFIG = {
  BASE_FOLDER_ID: '1ltl7RCbs7VXNVu6cid4HWKeJjToCX-AM', // From user's Drive
  BASE_FOLDER_URL: 'https://drive.google.com/drive/folders/1ltl7RCbs7VXNVu6cid4HWKeJjToCX-AM',
  MAX_IMAGE_SIZE_MB: 10,
  SUPPORTED_FORMATS: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
  IMAGES_PER_PRODUCT: 4,
} as const;

package com.app.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FileUtils {

    /**
     * Converts a MultipartFile to a byte array.
     *
     * @param file the MultipartFile to convert
     * @return the byte array representing the file content
     * @throws IOException if an I/O error occurs
     */
    public static byte[] convertMultipartFileToBytes(MultipartFile file) throws IOException {
        return file.getBytes();
    }

    /**
     * Converts a byte array to a base64-encoded string for displaying images.
     *
     * @param data the byte array to convert
     * @return the base64-encoded string
     */
    public static String convertBytesToBase64(byte[] data) {
        return java.util.Base64.getEncoder().encodeToString(data);
    }

    /**
     * Converts a base64-encoded string to a byte array.
     *
     * @param base64 the base64-encoded string to convert
     * @return the byte array
     */
    public static byte[] convertBase64ToBytes(String base64) {
        return java.util.Base64.getDecoder().decode(base64);
    }
}
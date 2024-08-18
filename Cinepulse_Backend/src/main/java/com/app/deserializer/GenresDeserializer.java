// GenresDeserializer.java
package com.app.deserializer;

import com.app.entities.Genres;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.io.IOException;

public class GenresDeserializer extends JsonDeserializer<Genres> {

    @Override
    public Genres deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        String value = p.getText().toUpperCase(); // Convert to uppercase
        try {
            return Genres.valueOf(value);
        } catch (IllegalArgumentException e) {
            throw new InvalidFormatException(p, "Invalid genre value", value, Genres.class);
        }
    }
}

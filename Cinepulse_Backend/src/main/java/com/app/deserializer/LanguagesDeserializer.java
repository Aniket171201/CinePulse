// LanguagesDeserializer.java
package com.app.deserializer;

import com.app.entities.Languages;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.io.IOException;

public class LanguagesDeserializer extends JsonDeserializer<Languages> {

    @Override
    public Languages deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        String value = p.getText().toUpperCase(); // Convert to uppercase
        try {
            return Languages.valueOf(value);
        } catch (IllegalArgumentException e) {
            throw new InvalidFormatException(p, "Invalid language value", value, Languages.class);
        }
    }
}

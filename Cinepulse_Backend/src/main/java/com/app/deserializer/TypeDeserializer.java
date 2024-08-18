package com.app.deserializer;

import com.app.entities.Type;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.io.IOException;

public class TypeDeserializer extends JsonDeserializer<Type> {

    @Override
    public Type deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        String value = p.getText().toUpperCase(); // Convert to uppercase
        System.out.println("Deserializing Type: " + value); // Debug log
        try {
            return Type.valueOf(value);
        } catch (IllegalArgumentException e) {
            throw new InvalidFormatException(p, "Invalid type value", value, Type.class);
        }
    }
}

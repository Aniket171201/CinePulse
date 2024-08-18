package com.app.entities;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = RoleDeserializer.class) // Annotation at the enum level
public enum Role {
    USER, ADMIN, MANAGER;

    public static Role fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null; // Or return a default value like USER
        }
        return Role.valueOf(value.toUpperCase());
    }
}

class RoleDeserializer extends JsonDeserializer<Role> {
    @Override
    public Role deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String value = jsonParser.getText();
        return Role.fromString(value);
    }
}

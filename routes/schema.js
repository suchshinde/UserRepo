const userSchema = {
    "type": "object",
    "properties": {
        "firstname": {"type": "string"},
        "lastname": {"type": "string"},
        "address": {"type": "string"},
        "email": {"type": "email"},
        "mobile":{"type": "number"},
    },
    "required": ["firstname","lastname","email","mobile"]
};

module.exports =userSchema;


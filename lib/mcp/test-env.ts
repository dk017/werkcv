// Imported first by the MCP tests: placeholder settings so modules that read env at load time
// (OpenAI client, Prisma) can be imported. Nothing here is used to make a real call.
process.env.OPENAI_API_KEY ||= "test-key-not-used";
process.env.DATABASE_URL ||= "postgresql://test:test@localhost:5432/test";

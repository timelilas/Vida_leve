export function createSwaggerErrorExample(params: {
  path: string;
  status: number;
  error: string;
  field?: string;
}) {
  return {
    timestamp: new Date().toISOString(),
    path: params.path,
    status: params.status,
    field: params.field,
    error: params.error,
  };
}

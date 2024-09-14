const handleHTTPErrorLog = (res, error) => {
    res.status(500).send({ error: error.message });
};
export function handleServerError(res, error) {
    res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
    });
}
export { handleHTTPErrorLog };

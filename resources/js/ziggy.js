const Ziggy = {
    "url": "http:\/\/127.0.0.1:8000",
    "port": null,
    "defaults": {},
    "routes": {
        "product.index": {
            "uri": "product\/index",
            "methods": [
                "GET",
                "HEAD"
            ]
        },
        "product.create": {
            "uri": "product\/create",
            "methods": [
                "GET",
                "HEAD"
            ]
        },
        "product.store": {
            "uri": "product\/store",
            "methods": [
                "POST"
            ]
        },
        "product.view": {
            "uri": "product\/view\/{id}",
            "methods": [
                "GET",
                "HEAD"
            ],
            "parameters": [
                "id"
            ]
        },
        "product.edit": {
            "uri": "product\/edit\/{id}",
            "methods": [
                "GET",
                "HEAD"
            ],
            "parameters": [
                "id"
            ]
        },
        "product.update": {
            "uri": "product\/update\/{id}",
            "methods": [
                "POST"
            ],
            "parameters": [
                "id"
            ]
        },
        "product.delete": {
            "uri": "product\/delete\/{id}",
            "methods": [
                "GET",
                "HEAD"
            ],
            "parameters": [
                "id"
            ]
        },
        "storage.local": {
            "uri": "storage\/{path}",
            "methods": [
                "GET",
                "HEAD"
            ],
            "wheres": {
                "path": ".*"
            },
            "parameters": [
                "path"
            ]
        }
    }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy
};

import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";

export function asyncLoadComponent(loadComponent) {
    return loadable(loadComponent, {
        fallback: <div className="loading"></div>,
    });
}

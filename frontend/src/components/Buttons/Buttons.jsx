import React from "react";
export function PrimaryButton({children,onClick,type="button",size="md",className=""}){const s=size==="lg"?"btn-lg":size==="sm"?"btn-sm":"";return<button className={`btn btn-primary ${s} ${className}`} type={type} onClick={onClick}>{children}</button>;}
export function SecondaryButton({children,onClick,type="button",size="md",className=""}){const s=size==="lg"?"btn-lg":size==="sm"?"btn-sm":"";return<button className={`btn btn-secondary ${s} ${className}`} type={type} onClick={onClick}>{children}</button>;}
export function GhostButton({children,onClick,type="button",size="md",className=""}){const s=size==="lg"?"btn-lg":size==="sm"?"btn-sm":"";return<button className={`btn btn-ghost ${s} ${className}`} type={type} onClick={onClick}>{children}</button>;}

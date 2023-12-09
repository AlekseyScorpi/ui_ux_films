import { PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";

export const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
        {children}
    </QueryProvider>
  );
};

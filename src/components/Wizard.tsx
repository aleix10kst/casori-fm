import { PropsWithChildren } from "react";

export function Wizard({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full rounded-xl bg-gray-50 px-4 py-12 shadow-lg md:h-auto md:w-2/4 md:px-8">
      <main className="flex h-full flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}

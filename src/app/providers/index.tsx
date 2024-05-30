import { RouterProvider, RouterProviderProps } from "react-router-dom";

export const Providers = ({ router }: RouterProviderProps ) => {
    return (
      <RouterProvider router={router} />
    );
}
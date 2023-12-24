import { RefreshControl } from "react-native";

type RefreshControlProps = React.ComponentProps<typeof RefreshControl>;

export const Refresh = (props: RefreshControlProps) => {
  return <RefreshControl testID='refresh-control' {...props} />;
};

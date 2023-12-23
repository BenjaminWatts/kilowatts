import React from "react";
import { Dialog, Text } from "@rneui/themed";
import { Linking } from "react-native";
import { urls } from "../services/nav";
import { getCurrentYear } from "../common/utils";
import { useRouter } from "expo-router";

type ConsentDialogProps = {
  isVisible: boolean;
  onAccept: () => void;
  onBackdropPress?: () => void;
  updatedAt: Date | null;
};

export const ConsentDialog: React.FC<ConsentDialogProps> = ({
  onAccept,
  isVisible,
  onBackdropPress,
  updatedAt,
}) => {
  const router = useRouter();
  return (
    <Dialog
      testID="consent-dialog"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
      <Dialog.Title title="kilowatts.io" />
      <Text>
        This app is provided without any warranty. Use at your own risk.
      </Text>
      <Text>
        Contains BMRS data © Elexon Limited copyright and database right{" "}
        {getCurrentYear()}.
      </Text>
      {updatedAt && <Text>App last updated {updatedAt.toLocaleString()}</Text>}
      <Dialog.Actions>
        <Dialog.Button
          title="I agree"
          onPress={onAccept}
          testID="consent-dialog-accept-button"
        />
        <Dialog.Button
          title="View Elexon License"
          onPress={() => Linking.openURL(urls.elexonLicense)}
        />
        {onBackdropPress && (
          <Dialog.Button
            title="View App Privacy Policy"
            onPress={() => {
              onBackdropPress();
              router.push(urls.privacy);
            }}
          />
        )}
      </Dialog.Actions>
    </Dialog>
  );
};

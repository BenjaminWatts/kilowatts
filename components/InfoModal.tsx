import React from "react";
import log from "../services/log";
import { ConsentDialog } from "../atoms/dialogs";
import { HeaderInfoIcon } from "../atoms/icons";

type InfoModalProps = {};

/*
InfoModal is a modal dialog that displays information about the app.
In modalVisible = false it renders as just an icon, which can be rendered within a header.
In modalVisible = true it renders as a modal dialog.
*/
export const InfoModal: React.FC<InfoModalProps> = () => {
  log.debug("InfoModal");
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <ConsentDialog
        updatedAt={null}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onAccept={() => setModalVisible(false)}
      />
      <HeaderInfoIcon
        onPress={() => setModalVisible(true)}
      />
    </>
  );
};

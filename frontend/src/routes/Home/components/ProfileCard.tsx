import React from "react";
import { Flex, Card, Text } from "components";
import UserImg from "assets/user.png";
import { FaGraduationCap } from "react-icons/fa";
import { useUser } from "state/hooks";

const ProfileCard = () => {
  const user = useUser();

  const userImage = `http://127.0.0.1:5000/${user?.profileImgPath || "images/unknownUser.png"}`

  return (
    <Card size="sm" flexDirection="row" pinColor="rgba(255, 199, 0, 1)">
      <img src={userImage} alt="User Picture" width={64} height={64} style={{ borderRadius: '50%' }} />
      <Flex flexDirection="column" justifyContent='center'>
        <Text bold>
          {user.firstName} {user.lastName} <FaGraduationCap />{" "}
        </Text>
        <Text>Bilgisayar Mühendisliği</Text>
      </Flex>
    </Card>
  );
};

export default ProfileCard;

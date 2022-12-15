import React from "react";
import { Flex, Card, Text } from "components";
import UserImg from "assets/user.png";
import { FaGraduationCap } from "react-icons/fa";
import { useUser } from "state/hooks";

const ProfileCard = () => {
  const user = useUser();
  return (
    <Card size="sm" flexDirection="row">
      <img src={UserImg} alt="User Picture" width={64} />
      <Flex flexDirection="column">
        <Text bold>
          {user.firstName} {user.lastName} <FaGraduationCap />{" "}
        </Text>
        <Text>Bilgisayar Mühendisliği</Text>
      </Flex>
    </Card>
  );
};

export default ProfileCard;

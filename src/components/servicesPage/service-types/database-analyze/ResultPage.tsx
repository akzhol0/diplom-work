import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import Filter from "@/components/servicesPage/service-types/database-analyze/Filter";

type ResultPageProps = {
  userDecision: string;
  data: any;
};

const ResultPage = ({ userDecision, data }: ResultPageProps) => {
  const [databaseUsers, setDatabaseUsers] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const getAllUsersFromDatabase = async () => {
    const q = query(collection(db, "serviceUserDatabase"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDatabaseUsers((prev: any) => [...prev, doc.data()]);
    });
    setTimeout(() => setLoaded(true), 1000);
  };

  const getUsersFromFile = () => {
    data.map((item: any) => {
      setDatabaseUsers((prev: any) => [...prev, item]);
    });
    setTimeout(() => setLoaded(true), 5000);
  };

  useEffect(() => {
    if (userDecision === "default") {
      getAllUsersFromDatabase();
    } else if (userDecision === "own-database") {
      getUsersFromFile();
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-center">Результаты</p>
      <Filter data={databaseUsers} loaded={loaded} />
    </div>
  );
};

export default ResultPage;

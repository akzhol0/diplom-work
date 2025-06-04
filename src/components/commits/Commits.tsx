"use client";

import React, { useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

const Commits = () => {
  const [commits, setCommits] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getCommits = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/repos/akzhol0/diplom-work/commits?per_page=30&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        },
      );

      const linkHeader = res.headers.get("Link");
      let totalPagesLink = 1;
      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (match) {
          totalPagesLink = parseInt(match[1]);
        }
      }
      getPaginationNumber(totalPagesLink);

      const data = await res.json();
      setCommits(data);
    } catch (error) {
      console.error("Ошибка при получении коммитов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    commits.length === 0 && getCommits(1);
  }, []);

  const formatTime = (timestamp: any): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleString("ru-RU", options).replace(",", "");
  };

  const getPaginationNumber = (maxPageNumber: number) => {
    setTotalPages([]);
    for (let i = 1; i <= maxPageNumber; i++) {
      setTotalPages((prevState: any) => [...prevState, i]);
    }
  };

  if (loading) return <LoadingUI />;

  return (
    <div className="w-full md:w-[60%] min-h-[600px]">
      <p className="px-4 text-start font-bold text-[30px] md:text-[40px] mb-6">
        Все обновления
      </p>
      <div className="space-y-2 px-2">
        {commits.map((commit: any) => (
          <div key={commit.sha} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="min-w-[50px] min-h-[50px] me-2">
                <a
                  href={commit.author.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={commit.author.avatar_url}
                    alt={commit.author.login}
                    width={50}
                    height={50}
                    className="rounded-[50%]"
                  />
                </a>
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  <p className="flex gap-4 items-center text-lg font-medium">
                    {commit.commit.author.name}
                    <span className="text-gray-400 text-xs">
                      {formatTime(commit.commit.author.date)}
                    </span>
                  </p>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    {commit.commit.message}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    Commit shaID: {commit.sha.slice(0, 18)}
                  </p>
                </div>
                <a
                  href={commit.html_url}
                  target="_blank"
                  className="cursor-pointer"
                >
                  <FiExternalLink className="inline-block" />
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-2">
          {totalPages.map((page: number) => (
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setCurrentPage(page);
                getCommits(page);
              }}
              className={`${currentPage === page && "bg-gray-400"} 
              px-2 text-black bg-gray-200 cursor-pointer hover:bg-gray-400`}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commits;

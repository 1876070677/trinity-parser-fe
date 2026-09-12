import { Github, ExternalLink, Newspaper } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useContributors } from "@/reactQuery/contributorQuery";
import { ContributorRole } from "@/common/types/contributor";
import { extractGithubUsername, getGithubAvatarUrl } from "@/lib/github";

const OWNER_ORDER = ["김시현", "정지원", "김상연"];

const ARTICLE_INFO = {
  url: "http://www.cukjournal.com/news/articleView.html?idxno=4652",
  title: "수강신청의 새로운 기본값: TRINITY PARSER 제작팀을 만나다.",
  description: "김영윤 기자",
  source: "가톨릭대학보",
};

function ArticleCard() {
  return (
    <a
      href={ARTICLE_INFO.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-12 max-w-2xl mx-auto"
    >
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300">
        <div className="flex items-stretch">
          <div className="flex-shrink-0 w-24 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Newspaper className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                {ARTICLE_INFO.source}
              </span>
              <span>보도자료</span>
            </div>
            <h3 className="text-gray-900 font-medium mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
              {ARTICLE_INFO.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {ARTICLE_INFO.description}
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center px-4 text-gray-400 group-hover:text-blue-500 transition-colors">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      </div>
    </a>
  );
}

function AboutPage() {
  const { data: contributors } = useContributors();

  const owners = (contributors?.filter((c) => c.role === ContributorRole.OWNER) ?? [])
    .slice()
    .sort((a, b) => OWNER_ORDER.indexOf(a.name) - OWNER_ORDER.indexOf(b.name));
  const communityContributors =
    contributors?.filter((c) => c.role === ContributorRole.CONTRIBUTOR) ?? [];

  return (
    <ScrollArea className="h-full">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-3xl text-gray-900 mb-4">팀 소개</div>
          <div className="text-gray-600 max-w-2xl mx-auto break-keep">
            <div>Trinity Parser를 개발하고 있는 우리 팀을 소개합니다.</div>
            <div>각자의 전문성을 살려 최고의 사용자 경험을 제공하기 위해 노력하고 있습니다.</div>
          </div>
        </div>

        <ArticleCard />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {owners.map((owner) => (
            <div
              key={owner.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:aspect-square overflow-hidden bg-white">
                {owner.imgUrl && (
                  <img
                    src={owner.imgUrl}
                    alt={owner.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="text-xl text-gray-900 mb-1">{owner.name}</div>
                {owner.part && <p className="text-sm text-blue-600 mb-3">{owner.part}</p>}
                {owner.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed break-keep">
                    {owner.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {communityContributors.length > 0 && (
          <div className="mt-16">
            <hr className="border-gray-200 mb-8" />
            <div className="text-center mb-6">
              <div className="text-xl text-gray-900 mb-1">Contributors</div>
              <p className="text-sm text-gray-500">
                Trinity Parser에 기여해주신 분들입니다.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {communityContributors.map((contributor) => {
                const username = extractGithubUsername(contributor.description);

                if (!username) {
                  return (
                    <div key={contributor.id} className="flex flex-col items-center gap-1 w-16">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Github className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-500 text-center">{contributor.name}</span>
                    </div>
                  );
                }

                return (
                  <Tooltip key={contributor.id}>
                    <TooltipTrigger
                      render={
                        <a
                          href={`https://github.com/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <img
                            src={getGithubAvatarUrl(username, 112)}
                            alt={contributor.name}
                            className="w-14 h-14 rounded-full object-cover border border-gray-200 group-hover:border-blue-400 group-hover:shadow-md transition-all"
                          />
                        </a>
                      }
                    />
                    <TooltipContent>{contributor.name}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default AboutPage;

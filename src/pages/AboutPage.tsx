import { TEAM_MEMBERS } from "@/common/const";
import { Github, ExternalLink, Newspaper } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <ScrollArea className="h-full">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-3xl text-gray-900 mb-4">팀 소개</div>
          <p className="text-gray-600 max-w-2xl mx-auto break-keep">
            <div>Trinity Parser를 개발하고 있는 우리 팀을 소개합니다.</div>
            <div>각자의 전문성을 살려 최고의 사용자 경험을 제공하기 위해 노력하고 있습니다.</div>
          </p>
        </div>

        <ArticleCard />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full object-contain md:h-full md:object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="text-xl text-gray-900 mb-1">{member.name}</div>
                <p className="text-sm text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed break-keep">
                  {member.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

export default AboutPage;

"use client";

import { cn } from "@/lib/cn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

export default function Page() {
  return (
    <main className="-mt-[57px] flex min-h-full flex-col items-center gap-8">
      <Hero />
    </main>
  );
}

function Hero() {
  const router = useRouter();
  const refBox = useRef<HTMLDivElement>(null);
  const refBoxTitle = useRef<HTMLSpanElement>(null);
  const refBoxLeftCard = useRef<HTMLDivElement>(null);
  const refLight = useRef<HTMLDivElement>(null);
  const refStats = useRef<HTMLDivElement>(null);
  const refStatsUser = useRef<HTMLSpanElement>(null);
  const refStatsDAU = useRef<HTMLSpanElement>(null);
  const refStatsStar = useRef<HTMLSpanElement>(null);
  const [isShowLight, setIsShowLight] = useState(false);
  const [pos, setPos] = useState({
    left: 0,
    top: 0,
  });
  const [animating, setAnimating] = useState(false);

  const maxXRotation = 5;
  const maxYRotation = 5;

  useGSAP(() => {
    if (!refBox.current) return;
    refBox.current.style.opacity = "1";
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refBox.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: {
        ease: "power4.out",
        duration: 1,
      },
    });
    tl.from(
      refBox.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      0,
    );
    tl.from(
      refBoxTitle.current,
      {
        text: "",
      },
      0.5,
    );
    tl.from(
      refBoxLeftCard.current,
      {
        scale: 0,
      },
      0.75,
    );
    tl.then(() => {
      setAnimating(false);
    });

    // 统计数字动画
    Promise.all([
      fetch("https://api.project-graph.top/api/stats"),
      fetch("/api/stars"),
    ])
      .then((resps) => Promise.all(resps.map((it) => it.json())))
      .then(
        ([
          {
            data: { totalUsers, averageDau },
          },
          { stars: githubStars },
        ]) => {
          const animationObj = {
            totalUsers: 0,
            averageDau: 0,
            githubStars: 0,
          };
          gsap.fromTo(
            refStats.current,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power4.out",
            },
          );
          gsap.to(animationObj, {
            totalUsers,
            averageDau,
            githubStars,
            duration: 2,
            ease: "power4.out",
            onUpdate: () => {
              if (refStatsUser.current) {
                refStatsUser.current.textContent =
                  Math.floor(animationObj.totalUsers) + "+";
              }
              if (refStatsDAU.current) {
                refStatsDAU.current.textContent =
                  Math.floor(animationObj.averageDau) + "+";
              }
              if (refStatsStar.current) {
                refStatsStar.current.textContent = String(
                  Math.floor(animationObj.githubStars),
                );
              }
            },
          });
        },
      );
  });

  function out() {
    // 反着播放一次动画
    if (!refBox.current) return;
    setAnimating(true);
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.in",
        duration: 1,
      },
    });
    tl.to(
      refBoxLeftCard.current,
      {
        scale: 0,
        opacity: 0,
      },
      0,
    );
    tl.to(
      refBox.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      1.25,
    );
    tl.then(() => {
      setAnimating(false);
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="h-screen w-full px-64 py-32">
        <div
          className="border-fd-foreground flex size-full flex-col gap-4 rounded-2xl border-2 p-4 opacity-0"
          ref={refBox}
        >
          <span className="text-3xl" ref={refBoxTitle}>
            Graphif
          </span>
          <div className="flex flex-1 gap-4">
            <div
              className="bg-fd-accent relative flex w-1/2 cursor-pointer flex-col justify-end overflow-hidden rounded-xl p-12"
              ref={refBoxLeftCard}
              style={{
                willChange: "transform",
                transform:
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              }}
              onClick={() => {
                out();
                router.push("/docs/app");
              }}
              onMouseEnter={() => {
                if (refBoxLeftCard.current && !animating) {
                  refBoxLeftCard.current.style.transition =
                    "transform 0.3s ease-out";
                }
              }}
              onMouseLeave={() => {
                setIsShowLight(false);
                if (refBoxLeftCard.current && !animating) {
                  refBoxLeftCard.current.style.transition = "transform 0.5s";
                  refBoxLeftCard.current.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                }
              }}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                if (refBoxLeftCard.current && !animating) {
                  setIsShowLight(true);
                  const { x, y } =
                    refBoxLeftCard.current.getBoundingClientRect();
                  const { clientX, clientY } = e;
                  const offsetX = clientX - x;
                  const offsetY = clientY - y;
                  const cardRect =
                    refBoxLeftCard.current.getBoundingClientRect();
                  const rangeX = cardRect.width / 2;
                  const rangeY = cardRect.height / 2;
                  const left = offsetX - 50;
                  const top = offsetY - 50;
                  setPos({
                    left,
                    top,
                  });
                  refBoxLeftCard.current.style.transition = "transform 0.1s";
                  const rotateX = ((offsetY - rangeY) / rangeY) * maxXRotation;
                  const rotateY =
                    -1 * ((offsetX - rangeX) / rangeX) * maxYRotation;
                  refBoxLeftCard.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
              }}
              onMouseDown={() => {
                if (refBoxLeftCard.current && !animating) {
                  refBoxLeftCard.current.style.transition = "transform 0.15s";
                  refBoxLeftCard.current.style.transform +=
                    " scale3d(0.95, 0.95, 0.95)";
                }
              }}
              onMouseUp={() => {
                if (refBoxLeftCard.current && !animating) {
                  refBoxLeftCard.current.style.transition = "transform 0.5s";
                  refBoxLeftCard.current.style.transform =
                    refBoxLeftCard.current.style.transform.replace(
                      / scale3d\(0.95, 0.95, 0.95\)/,
                      "",
                    );
                }
              }}
            >
              <div
                ref={refLight}
                className={cn(
                  isShowLight ? "opacity-100" : "opacity-0",
                  "absolute h-[100px] w-[100px] rounded-full bg-blue-500 blur-[150px] filter transition-opacity duration-300",
                )}
                style={{
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                  pointerEvents: "none",
                }}
              />
              <span className="text-7xl leading-snug font-bold">
                Project Graph
              </span>
            </div>
            <div className="flex w-1/2 flex-col gap-4 pl-2">
              <span className="border-fd-info border-l-4 pl-4 text-lg">
                一款基于图论的嵌套网状思维导图，让梳理超复杂逻辑关系变得轻松，通过直观的拓扑连接与区块化布局帮助你设计更庞大的想法，理清复杂的知识。
              </span>
              <div
                className="flex gap-4 rounded-xl border p-4 opacity-0"
                ref={refStats}
              >
                <div
                  className="flex grow flex-col items-center gap-2"
                  title={"数据从 v2.0.0-beta.1 版本开始统计\n数据缓存 5 分钟"}
                >
                  <span
                    className="text-3xl font-bold"
                    ref={refStatsUser}
                  ></span>
                  <span className="text-sm">用户数</span>
                </div>
                <div
                  className="flex grow flex-col items-center gap-2"
                  title={
                    "数据从 v2.0.0-beta.1 版本开始统计\n此数据指 7 天内每天打开过任意工程文件的用户数量的平均值\n数据缓存 5 分钟"
                  }
                >
                  <span className="text-3xl font-bold" ref={refStatsDAU}></span>
                  <span className="text-sm">每日活跃用户</span>
                </div>
                <div
                  className="flex grow cursor-pointer flex-col items-center gap-2"
                  title="此为实时数据"
                  onClick={() => {
                    window.open(
                      "https://github.com/graphif/project-graph",
                      "_blank",
                    );
                  }}
                >
                  <span
                    className="text-3xl font-bold"
                    ref={refStatsStar}
                  ></span>
                  <span className="text-sm">GitHub Stars</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

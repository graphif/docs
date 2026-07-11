"use client";
import { usePathname } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import { useNotebookLayout } from "fumadocs-ui/layouts/notebook";
import {
  type LayoutTab,
  LinkItem,
  type LinkItemType,
  type MenuItemType,
  isLayoutTabActive,
} from "fumadocs-ui/layouts/shared";
import {
  ChevronDown,
  Download,
  Heart,
  Languages,
  Sidebar as SidebarIcon,
} from "lucide-react";
import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type PointerEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { buttonVariants } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/cn";

export function Header(props: ComponentProps<"header">) {
  const {
    slots,
    navItems,
    isNavTransparent,
    props: { tabMode, nav, tabs, sidebar },
  } = useNotebookLayout();
  const { open } = slots.sidebar?.useSidebar?.() ?? {};
  const navMode = nav?.mode ?? "auto";
  const sidebarCollapsible = sidebar.collapsible ?? true;
  const showLayoutTabs = tabMode === "navbar" && tabs.length > 0;

  if (nav?.component) return nav.component;

  return (
    <header
      id="nd-subnav"
      data-transparent={isNavTransparent && !open}
      {...props}
      className={cn(
        "data-[transparent=false]:bg-fd-background/80 layout:[--fd-header-height:--spacing(14)] sticky top-(--fd-docs-row-1) z-10 flex flex-col backdrop-blur-sm transition-colors [grid-area:header]",
        showLayoutTabs && "lg:layout:[--fd-header-height:--spacing(24)]",
        props.className,
      )}
    >
      <div
        data-header-body=""
        className="flex h-14 gap-2 border-b px-4 md:px-6"
      >
        <div
          className={cn(
            "items-center",
            navMode === "top" && "flex flex-1",
            navMode === "auto" &&
              "hidden max-md:flex has-data-[collapsed=true]:md:flex",
          )}
        >
          {sidebarCollapsible && slots.sidebar && navMode === "auto" && (
            <slots.sidebar.collapseTrigger
              className={cn(
                buttonVariants({
                  color: "ghost",
                  size: "icon-sm",
                }),
                "text-fd-muted-foreground -ms-1.5 data-[collapsed=false]:hidden max-md:hidden",
              )}
            >
              <SidebarIcon />
            </slots.sidebar.collapseTrigger>
          )}
          {slots.navTitle && (
            <slots.navTitle
              className={cn(
                "inline-flex items-center gap-2.5 font-semibold",
                navMode === "auto" && "md:hidden",
              )}
            />
          )}
          {nav?.children}
        </div>

        {showLayoutTabs && (
          <LayoutHeaderTabs
            data-header-tabs=""
            className="my-auto overflow-x-auto max-lg:hidden"
            tabs={tabs}
          />
        )}

        <div className="flex flex-1 items-center justify-end md:gap-2">
          {slots.searchTrigger && (
            <slots.searchTrigger.full
              hideIfDisabled
              className={cn(
                "my-auto w-max max-md:hidden",
                navMode === "top"
                  ? "max-w-sm rounded-xl ps-2.5"
                  : "max-w-[240px]",
              )}
            />
          )}

          <div className="flex items-center gap-6 empty:hidden max-lg:hidden">
            {navItems
              .filter((item) => item.type !== "icon")
              .map((item, i) => (
                <NavbarLinkItem key={i} item={item} />
              ))}
          </div>

          {navItems
            .filter((item) => item.type === "icon")
            .map((item, i) => (
              <LinkItem
                key={i}
                item={item}
                className={cn(
                  buttonVariants({ size: "icon-sm", color: "ghost" }),
                  "text-fd-muted-foreground max-lg:hidden",
                )}
                aria-label={item.label}
              >
                {item.icon}
              </LinkItem>
            ))}

          <div className="flex items-center md:hidden">
            {slots.searchTrigger && (
              <slots.searchTrigger.sm hideIfDisabled className="p-2" />
            )}
            {slots.sidebar && (
              <slots.sidebar.trigger
                className={cn(
                  buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                    className: "-me-1.5 p-2",
                  }),
                )}
              >
                <SidebarIcon />
              </slots.sidebar.trigger>
            )}
          </div>

          <div className="flex items-center gap-2 max-md:hidden">
            {slots.languageSelect && (
              <slots.languageSelect.root>
                <Languages className="text-fd-muted-foreground size-4.5" />
              </slots.languageSelect.root>
            )}
            {slots.themeSwitch && <slots.themeSwitch />}

            <Link
              href="/donate"
              className="hover:bg-fd-primary dark:hover:text-fd-primary-foreground bg-fd-primary/2 text-fd-primary inline-flex h-9 items-center justify-center gap-2 rounded-full border px-3 no-underline transition hover:text-white active:scale-95"
            >
              <Heart size={16} />
              <span>赞助</span>
            </Link>
            <Link
              href="/release/latest"
              className="hover:bg-fd-primary dark:hover:text-fd-primary-foreground bg-fd-primary/10 text-fd-primary inline-flex h-9 items-center justify-center gap-2 rounded-full border px-3 no-underline transition hover:text-white active:scale-95"
            >
              <Download size={16} />
              <span>立即下载</span>
            </Link>

            {sidebarCollapsible && slots.sidebar && navMode === "top" && (
              <slots.sidebar.collapseTrigger
                className={cn(
                  buttonVariants({
                    color: "secondary",
                    size: "icon-sm",
                  }),
                  "text-fd-muted-foreground -me-1.5 rounded-full",
                )}
              >
                <SidebarIcon />
              </slots.sidebar.collapseTrigger>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function LayoutHeaderTabs({
  tabs,
  className,
  ...props
}: ComponentProps<"div"> & {
  tabs: LayoutTab[];
}) {
  const pathname = usePathname();
  const selectedIdx = useMemo(() => {
    return tabs.findLastIndex((option) => isLayoutTabActive(option, pathname));
  }, [tabs, pathname]);

  return (
    <div className={cn("flex flex-row items-end gap-6", className)} {...props}>
      {tabs.map((option, i) => {
        const {
          icon,
          title,
          url,
          unlisted,
          props: { className, ...rest } = {},
        } = option;
        const isSelected = selectedIdx === i;

        return (
          <Link
            key={i}
            href={url}
            className={cn(
              "text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-2 border-b-2 border-transparent py-1.5 text-sm font-medium text-nowrap transition-colors",
              unlisted && !isSelected && "hidden",
              isSelected && "border-fd-primary text-fd-primary",
              className,
            )}
            {...rest}
          >
            <div className="size-4">{icon}</div>
            {title}
          </Link>
        );
      })}
    </div>
  );
}

function NavbarLinkItem({
  item,
  className,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === "custom") return item.children;

  if (item.type === "menu") {
    return <NavbarLinkItemMenu item={item} className={className} {...props} />;
  }

  return (
    <LinkItem
      item={item}
      className={cn(
        "text-fd-muted-foreground hover:text-fd-accent-foreground data-[active=true]:text-fd-primary text-sm transition-colors",
        className,
      )}
      {...props}
    >
      {item.text}
    </LinkItem>
  );
}

function NavbarLinkItemMenu({
  item,
  hoverDelay = 50,
  className,
  ...props
}: { item: MenuItemType; hoverDelay?: number } & HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number>(null);
  const freezeUntil = useRef<number>(null);

  const delaySetOpen = (value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = window.setTimeout(() => {
      setOpen(value);
      freezeUntil.current = Date.now() + 300;
    }, hoverDelay);
  };
  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    delaySetOpen(true);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    delaySetOpen(false);
  };
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (freezeUntil.current === null || Date.now() >= freezeUntil.current)
          setOpen(value);
      }}
    >
      <PopoverTrigger
        className={cn(
          "text-fd-muted-foreground has-data-[active=true]:text-fd-primary data-[popup-open]:text-fd-accent-foreground inline-flex items-center gap-1.5 p-1 text-sm transition-colors focus-visible:outline-none",
          className,
        )}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...props}
      >
        {item.url ? (
          <LinkItem item={item as never}>{item.text}</LinkItem>
        ) : (
          item.text
        )}
        <ChevronDown className="size-3" />
      </PopoverTrigger>
      <PopoverContent
        className="text-fd-muted-foreground flex flex-col p-1 text-start"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {item.items.map((child, i) => {
          if (child.type === "custom")
            return <Fragment key={i}>{child.children}</Fragment>;

          return (
            <LinkItem
              key={i}
              item={child}
              className="hover:bg-fd-accent hover:text-fd-accent-foreground data-[active=true]:text-fd-primary inline-flex items-center gap-2 rounded-md p-2 transition-colors [&_svg]:size-4"
              onClick={() => {
                if (isTouchDevice()) setOpen(false);
              }}
            >
              {child.icon}
              {child.text}
            </LinkItem>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

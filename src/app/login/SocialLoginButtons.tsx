"use client";

import { signInWithOAuth } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

// 社交登录图标组件
// const GoogleIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24">
//     <path
//       fill="currentColor"
//       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//     />
//     <path
//       fill="currentColor"
//       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//     />
//     <path
//       fill="currentColor"
//       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//     />
//     <path
//       fill="currentColor"
//       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//     />
//   </svg>
// );

// const WeChatIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm4.721 2.471c-1.793-.213-3.637.289-4.938 1.423-1.123.98-1.685 2.354-1.566 3.728.119 1.374.81 2.642 1.944 3.564.297.241.623.445.961.623a.694.694 0 0 1 .357.830l-.203.927a.14.14 0 0 0-.022.069c0 .056.043.102.097.102.014 0 .029-.005.043-.016l1.173-.698a.537.537 0 0 1 .446-.061c.411.119.835.18 1.265.18 1.793.213 3.637-.289 4.938-1.423 1.123-.98 1.685-2.354 1.566-3.728-.119-1.374-.81-2.642-1.944-3.564a7.61 7.61 0 0 0-.961-.623.694.694 0 0 1-.357-.83l.203-.927a.14.14 0 0 0 .022-.069c0-.056-.043-.102-.097-.102-.014 0-.029.005-.043.016l-1.173.698a.537.537 0 0 1-.446.061 6.854 6.854 0 0 0-1.265-.18zm-2.595 1.982c.464 0 .839.383.839.857 0 .474-.375.857-.839.857-.464 0-.839-.383-.839-.857 0-.474.375-.857.839-.857zm3.972 0c.464 0 .839.383.839.857 0 .474-.375.857-.839.857-.464 0-.839-.383-.839-.857 0-.474.375-.857.839-.857z" />
//   </svg>
// );

export function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);

    try {
      // 模拟API调用
      await signInWithOAuth(provider);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        className="w-full"
        disabled={isLoading}
      >
        <GoogleIcon />
        <span className="ml-2">使用 Google 登录</span>
      </Button> */}

      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        className="w-full"
        disabled={isLoading}
      >
        <Github className="h-4 w-4" />
        <span className="ml-2">使用 GitHub 登录</span>
      </Button>

      {/* <Button
        variant="outline"
        onClick={() => handleSocialLogin("wechat")}
        className="w-full"
        disabled={isLoading}
      >
        <WeChatIcon />
        <span className="ml-2">使用微信登录</span>
      </Button> */}
    </div>
  );
}

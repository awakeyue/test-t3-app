"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Github } from "lucide-react";
import { login } from "@/actions/login";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Email login:", { email, password });
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      await login(formData);
    } catch (err) {
      setError(
        "登录失败," + (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "wechat",
  ) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: 实现Supabase社交登录逻辑
      console.log(`${provider} login`);
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError(
        `${provider}登录失败: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 w-full shadow-lg backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-card-foreground text-2xl font-bold">
          欢迎回来
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          登录您的账户以继续
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              邮箱
            </Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="请输入您的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border focus:ring-ring pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-card-foreground">
              密码
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="请输入您的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border focus:ring-ring pr-10 pl-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 px-0 text-sm"
            >
              忘记密码？
            </Button>
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">或者使用</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            className="border-border hover:bg-accent hover:text-accent-foreground w-full"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            使用 Google 登录
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
            className="border-border hover:bg-accent hover:text-accent-foreground w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            使用 GitHub 登录
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("wechat")}
            disabled={isLoading}
            className="border-border hover:bg-accent hover:text-accent-foreground w-full"
          >
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088l.594-.034zm-2.595 3.843c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982zm4.17 0c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982z" />
            </svg>
            使用微信登录
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-muted-foreground text-center text-sm">
          还没有账户？{" "}
          <Button variant="link" className="px-0">
            立即注册
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

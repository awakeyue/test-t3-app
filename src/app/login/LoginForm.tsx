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
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { login } from "@/actions/login";
import { SocialLoginButtons } from "./SocialLoginButtons";

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

        <SocialLoginButtons />
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

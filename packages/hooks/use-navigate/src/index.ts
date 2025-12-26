import type { NavigateOptions } from "react-router-dom";

import React from "react";
import { useLocation, useNavigate as useReactRouterNavigate } from "react-router-dom";

/**
 * 包装 navigate 函数，自动保留已有的 query 参数
 */
export function useNavigate() {
  const location = useLocation();
  const navigate = useReactRouterNavigate();

  return React.useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        navigate(to); // 如果是数字，直接使用原始 navigate（前进/后退）

        return;
      }

      // 解析目标路径和 query
      const [path, search] = to.split("?");
      const currentSearchParams = new URLSearchParams(location.search);
      const targetSearchParams = search ? new URLSearchParams(search) : new URLSearchParams();

      // 合并 query 参数：已有的参数会被保留，除非目标 URL 中明确指定了新的值
      currentSearchParams.forEach((value, key) => {
        if (!targetSearchParams.has(key)) {
          targetSearchParams.set(key, value);
        }
      });

      // 构建新的 URL
      const newSearch = targetSearchParams.toString();
      const newPath = newSearch ? `${path}?${newSearch}` : path;

      navigate(newPath, options);
    },
    [navigate, location.search],
  );
}

export type UseNavigateReturn = ReturnType<typeof useNavigate>;

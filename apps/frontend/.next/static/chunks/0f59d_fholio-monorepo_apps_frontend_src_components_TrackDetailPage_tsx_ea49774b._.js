(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackDetailPage",
    ()=>TrackDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/next@15.5.2_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/next@15.5.2_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/share.js [app-client] (ecmascript) <export default as Share>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/lucide-react@0.487.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$MusicPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/MusicPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/figma/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/recharts@2.15.4_react-dom@18.3.1_react@18.3.1/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
function TrackDetailPage(param) {
    let { onPageChange } = param;
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [investmentAmount, setInvestmentAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const trackData = {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Valley",
        genre: "Indie Pop",
        duration: 243,
        sharePrice: 12.5,
        totalShares: 4000,
        availableShares: 1500,
        currentRaise: 31250,
        targetRaise: 50000,
        backers: 130,
        daysLeft: 45,
        releaseDate: "March 2024",
        cover: "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "A nostalgic journey through neon-lit cities and digital landscapes. Drawing inspiration from dreamy indie pop and modern electronic production, Midnight Dreams captures the essence of late-night contemplation with lush soundscapes and ethereal vocals.",
        highlights: [
            "Featured on Spotify's Indie Radar playlist",
            "100K+ streams in first month",
            "Produced by Grammy-nominated engineer",
            "Part of upcoming debut album 'Electric Nights'"
        ],
        artistStats: {
            monthlyListeners: {
                spotify: {
                    count: "2.1M",
                    trend: 15.2,
                    streams: "12.3M"
                },
                appleMusic: {
                    count: "850K",
                    trend: 8.7,
                    streams: "4.2M"
                },
                tidal: {
                    count: "120K",
                    trend: 22.1,
                    streams: "680K"
                },
                deezer: {
                    count: "340K",
                    trend: -2.3,
                    streams: "1.8M"
                },
                amazon: {
                    count: "780K",
                    trend: 11.4,
                    streams: "3.9M"
                }
            },
            socialFollowers: {
                instagram: {
                    count: "485K",
                    trend: 18.5,
                    posts: "127",
                    engagement: "4.2%"
                },
                tiktok: {
                    count: "1.2M",
                    trend: 45.8,
                    videos: "23",
                    views: "8.3M"
                },
                youtube: {
                    count: "340K",
                    trend: 12.3,
                    videos: "45",
                    views: "2.1M"
                },
                twitter: {
                    count: "125K",
                    trend: 6.7,
                    tweets: "89",
                    interactions: "15.2K"
                }
            },
            location: "Los Angeles, CA",
            careerHighlights: [
                "Spotify Editorial Playlist: Indie Radar (2.1M followers)",
                "Featured on Apple Music's New Artist Spotlight",
                "TikTok viral hit with 5.2M views",
                "Opening for major artists on 15-city tour"
            ],
            growthPotential: [
                "Album release scheduled for Q2 2024",
                "Major label interest from 3 top-tier labels",
                "Sync licensing deals in progress for TV/film",
                "European tour dates being finalized"
            ]
        }
    };
    const priceHistory = [
        {
            date: "Jan",
            price: 10.0
        },
        {
            date: "Feb",
            price: 11.25
        },
        {
            date: "Mar",
            price: 12.5
        },
        {
            date: "Apr",
            price: 12.5
        }
    ];
    const fundingProgress = [
        {
            week: "Week 1",
            amount: 5000,
            backers: 25
        },
        {
            week: "Week 2",
            amount: 12500,
            backers: 58
        },
        {
            week: "Week 3",
            amount: 22000,
            backers: 89
        },
        {
            week: "Week 4",
            amount: 31250,
            backers: 130
        }
    ];
    const similarTracks = [
        {
            title: "Electric Pulse",
            artist: "Neon Riders",
            price: 25.0,
            change: 8.5,
            cover: "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
            title: "Ocean Waves",
            artist: "Coastal Sound",
            price: 8.75,
            change: 15.2,
            cover: "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        }
    ];
    const totalInvestment = investmentAmount * trackData.sharePrice;
    const fundingPercentage = trackData.currentRaise / trackData.targetRaise * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            onClick: ()=>onPageChange("browse"),
                            className: "mr-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        children: trackData.genre
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: "bg-green-100 text-green-800 border-green-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "w-3 h-3 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            "Trending"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: ()=>setIsLiked(!isLiked),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-5 h-5 ".concat(isLiked ? "fill-red-500 text-red-500" : "")
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "glass-card relative overflow-hidden border-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "aspect-video relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                        src: trackData.cover,
                                                        alt: trackData.title,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-8 left-8 right-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-3 mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 font-semibold",
                                                                        children: trackData.genre
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 206,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-500/20 text-green-400 border-green-500/30 font-semibold",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                className: "w-3 h-3 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 210,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            "Trending"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 209,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 205,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                className: "text-5xl font-black text-white mb-3 neon-text",
                                                                children: trackData.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-2xl text-purple-300 font-semibold cursor-pointer hover:text-purple-200 transition-colors",
                                                                        onClick: ()=>onPageChange("artist-page"),
                                                                        children: trackData.artist
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 218,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center text-white/60",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                className: "w-4 h-4 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 225,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            trackData.artistStats.location
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 224,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$MusicPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MusicPlayer"], {
                                    track: trackData,
                                    isPlaying: isPlaying,
                                    onPlayPause: ()=>setIsPlaying(!isPlaying),
                                    size: "full"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                                    defaultValue: "about",
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                            className: "grid w-full grid-cols-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "about",
                                                    children: "About"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "analytics",
                                                    children: "Analytics"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "similar",
                                                    children: "Similar Tracks"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "about",
                                            className: "space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid lg:grid-cols-2 gap-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                            className: "glass-card border-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                        className: "text-white",
                                                                        children: "About This Track"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 255,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-white/80 mb-6 leading-relaxed",
                                                                            children: trackData.description
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 260,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                    className: "font-semibold text-white",
                                                                                    children: "Track Highlights"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 264,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                                    className: "space-y-3",
                                                                                    children: trackData.highlights.map((highlight, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                            className: "flex items-center text-white/80",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3 flex-shrink-0"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                    lineNumber: 273,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                highlight
                                                                                            ]
                                                                                        }, index, true, {
                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                            lineNumber: 269,
                                                                                            columnNumber: 29
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 267,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 263,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                            className: "glass-card border-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                        className: "text-white flex items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                                className: "w-5 h-5 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 286,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            "Artist Stats"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 285,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                    className: "space-y-6",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                    className: "font-semibold text-white mb-3",
                                                                                    children: "Monthly Listeners"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 293,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "space-y-3",
                                                                                    children: [
                                                                                        {
                                                                                            platform: "Spotify",
                                                                                            data: trackData.artistStats.monthlyListeners.spotify,
                                                                                            color: "text-green-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "Apple Music",
                                                                                            data: trackData.artistStats.monthlyListeners.appleMusic,
                                                                                            color: "text-gray-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "Amazon Music",
                                                                                            data: trackData.artistStats.monthlyListeners.amazon,
                                                                                            color: "text-blue-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "Tidal",
                                                                                            data: trackData.artistStats.monthlyListeners.tidal,
                                                                                            color: "text-cyan-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "Deezer",
                                                                                            data: trackData.artistStats.monthlyListeners.deezer,
                                                                                            color: "text-purple-400"
                                                                                        }
                                                                                    ].map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "p-3 bg-white/5 rounded-lg",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex justify-between items-center mb-1",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            className: "text-white/80 text-sm font-medium",
                                                                                                            children: stat.platform
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 334,
                                                                                                            columnNumber: 33
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "flex items-center space-x-2",
                                                                                                            children: [
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                    className: "font-bold ".concat(stat.color),
                                                                                                                    children: stat.data.count
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 338,
                                                                                                                    columnNumber: 35
                                                                                                                }, this),
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center text-xs ".concat(stat.data.trend >= 0 ? "text-green-400" : "text-red-400"),
                                                                                                                    children: [
                                                                                                                        stat.data.trend >= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                                                            className: "w-3 h-3"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                            lineNumber: 349,
                                                                                                                            columnNumber: 39
                                                                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                                                                                            className: "w-3 h-3"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                            lineNumber: 351,
                                                                                                                            columnNumber: 39
                                                                                                                        }, this),
                                                                                                                        Math.abs(stat.data.trend),
                                                                                                                        "%"
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 341,
                                                                                                                    columnNumber: 35
                                                                                                                }, this)
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 337,
                                                                                                            columnNumber: 33
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                    lineNumber: 333,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "text-xs text-white/60",
                                                                                                    children: [
                                                                                                        stat.data.streams,
                                                                                                        " total streams"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                    lineNumber: 357,
                                                                                                    columnNumber: 31
                                                                                                }, this)
                                                                                            ]
                                                                                        }, index, true, {
                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                            lineNumber: 329,
                                                                                            columnNumber: 29
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 296,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 292,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                    className: "font-semibold text-white mb-3",
                                                                                    children: "Social Following"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 367,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "space-y-3",
                                                                                    children: [
                                                                                        {
                                                                                            platform: "Instagram",
                                                                                            data: trackData.artistStats.socialFollowers.instagram,
                                                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"],
                                                                                            color: "text-pink-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "TikTok",
                                                                                            data: trackData.artistStats.socialFollowers.tiktok,
                                                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
                                                                                            color: "text-white"
                                                                                        },
                                                                                        {
                                                                                            platform: "YouTube",
                                                                                            data: trackData.artistStats.socialFollowers.youtube,
                                                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
                                                                                            color: "text-red-400"
                                                                                        },
                                                                                        {
                                                                                            platform: "Twitter/X",
                                                                                            data: trackData.artistStats.socialFollowers.twitter,
                                                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"],
                                                                                            color: "text-blue-400"
                                                                                        }
                                                                                    ].map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "p-3 bg-white/5 rounded-lg",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex items-center justify-between mb-1",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "flex items-center",
                                                                                                            children: [
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(stat.icon, {
                                                                                                                    className: "w-4 h-4 mr-2 ".concat(stat.color)
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 407,
                                                                                                                    columnNumber: 35
                                                                                                                }, this),
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                    className: "text-white/80 text-sm font-medium",
                                                                                                                    children: stat.platform
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 410,
                                                                                                                    columnNumber: 35
                                                                                                                }, this)
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 406,
                                                                                                            columnNumber: 33
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "flex items-center space-x-2",
                                                                                                            children: [
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                    className: "font-bold text-white",
                                                                                                                    children: stat.data.count
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 415,
                                                                                                                    columnNumber: 35
                                                                                                                }, this),
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center text-xs ".concat(stat.data.trend >= 0 ? "text-green-400" : "text-red-400"),
                                                                                                                    children: [
                                                                                                                        stat.data.trend >= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                                                            className: "w-3 h-3"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                            lineNumber: 426,
                                                                                                                            columnNumber: 39
                                                                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                                                                                            className: "w-3 h-3"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                            lineNumber: 428,
                                                                                                                            columnNumber: 39
                                                                                                                        }, this),
                                                                                                                        Math.abs(stat.data.trend),
                                                                                                                        "%"
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                                    lineNumber: 418,
                                                                                                                    columnNumber: 35
                                                                                                                }, this)
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 414,
                                                                                                            columnNumber: 33
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                    lineNumber: 405,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "text-xs text-white/60 flex justify-between",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            children: stat.platform === "Instagram" ? "".concat(stat.data.posts, " posts") : stat.platform === "TikTok" ? "".concat(stat.data.videos, " videos") : stat.platform === "YouTube" ? "".concat(stat.data.videos, " videos") : "".concat(stat.data.tweets, " tweets")
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 435,
                                                                                                            columnNumber: 33
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            children: stat.platform === "Instagram" ? "".concat(stat.data.engagement, " avg engagement") : stat.platform === "TikTok" ? "".concat(stat.data.views, " total views") : stat.platform === "YouTube" ? "".concat(stat.data.views, " total views") : "".concat(stat.data.interactions, " interactions")
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                            lineNumber: 444,
                                                                                                            columnNumber: 33
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                    lineNumber: 434,
                                                                                                    columnNumber: 31
                                                                                                }, this)
                                                                                            ]
                                                                                        }, index, true, {
                                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                            lineNumber: 401,
                                                                                            columnNumber: 29
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 370,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 366,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            className: "w-full glass border-purple-500/50 text-purple-300 hover:bg-purple-500/10",
                                                                            onClick: ()=>onPageChange("artist-page"),
                                                                            children: "View Artist Profile"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 459,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "glass-card border-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                className: "text-white flex items-center text-2xl",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                        className: "w-6 h-6 mr-3 text-yellow-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Why Invest in This Track?"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid md:grid-cols-2 gap-8",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                className: "font-semibold text-white mb-4 flex items-center",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                        className: "w-4 h-4 mr-2 text-green-400"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 482,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    "Career Momentum"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 481,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                                className: "space-y-3",
                                                                                children: trackData.artistStats.careerHighlights.map((highlight, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                        className: "flex items-start text-white/80",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 492,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-sm",
                                                                                                children: highlight
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 493,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, index, true, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 488,
                                                                                        columnNumber: 31
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 485,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 480,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                className: "font-semibold text-white mb-4 flex items-center",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                                                        className: "w-4 h-4 mr-2 text-purple-400"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 502,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    "Growth Potential"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 501,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                                className: "space-y-3",
                                                                                children: trackData.artistStats.growthPotential.map((potential, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                        className: "flex items-start text-white/80",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 512,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-sm",
                                                                                                children: potential
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 513,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, index, true, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 508,
                                                                                        columnNumber: 31
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 505,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "glass-card border-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                className: "text-white",
                                                                children: "Investment Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                className: "w-8 h-8 mx-auto mb-2 text-purple-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 533,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/60 text-sm",
                                                                                children: "Release Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 534,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-white",
                                                                                children: trackData.releaseDate
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 537,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                                className: "w-8 h-8 mx-auto mb-2 text-blue-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 542,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/60 text-sm",
                                                                                children: "Total Shares"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 543,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-white",
                                                                                children: trackData.totalShares.toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 546,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 541,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                                                className: "w-8 h-8 mx-auto mb-2 text-green-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 551,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/60 text-sm",
                                                                                children: "Available"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 552,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-white",
                                                                                children: trackData.availableShares.toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 553,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 550,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                className: "w-8 h-8 mx-auto mb-2 text-orange-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 558,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white/60 text-sm",
                                                                                children: "Campaign"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 559,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-white",
                                                                                children: "60 days"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 560,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "analytics",
                                            className: "space-y-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                    children: "Share Price History"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 570,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-48",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                                                            data: priceHistory,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                                        id: "priceGradient",
                                                                                        x1: "0",
                                                                                        y1: "0",
                                                                                        x2: "0",
                                                                                        y2: "1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "5%",
                                                                                                stopColor: "#8B5CF6",
                                                                                                stopOpacity: 0.3
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 584,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "95%",
                                                                                                stopColor: "#EC4899",
                                                                                                stopOpacity: 0.1
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 589,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 577,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 576,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                                    dataKey: "date"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 596,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 597,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                    formatter: (value)=>[
                                                                                            "$".concat(value),
                                                                                            "Price"
                                                                                        ]
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 598,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                                                    type: "monotone",
                                                                                    dataKey: "price",
                                                                                    stroke: "#8B5CF6",
                                                                                    strokeWidth: 3,
                                                                                    fill: "url(#priceGradient)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 601,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 575,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 574,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                    children: "Funding Progress"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 616,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 615,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-48",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                                            data: fundingProgress,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                                    dataKey: "week"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 622,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 623,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                    formatter: (value, name)=>[
                                                                                            name === "amount" ? "$".concat(value.toLocaleString()) : value,
                                                                                            name === "amount" ? "Funding" : "Backers"
                                                                                        ]
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 624,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                                    dataKey: "amount",
                                                                                    fill: "#8B5CF6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                    lineNumber: 632,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 621,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 620,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 618,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 567,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 566,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "similar",
                                            className: "space-y-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-6",
                                                children: similarTracks.map((track, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                        className: "cursor-pointer hover:shadow-lg transition-shadow",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                            className: "p-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$figma$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                                        src: track.cover,
                                                                        alt: track.title,
                                                                        className: "w-16 h-16 rounded-lg object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 650,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                className: "font-semibold",
                                                                                children: track.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 656,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-muted-foreground text-sm",
                                                                                children: track.artist
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 657,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mt-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-bold",
                                                                                        children: [
                                                                                            "$",
                                                                                            track.price
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 661,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center text-green-500 text-sm",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                                                className: "w-3 h-3 mr-1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                                lineNumber: 663,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            "+",
                                                                                            track.change,
                                                                                            "%"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                        lineNumber: 662,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                                lineNumber: 660,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 655,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 649,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, index, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 642,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "glass-card sticky top-24 border-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-center text-2xl font-bold text-white",
                                            children: "Invest in Track"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                            lineNumber: 682,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 681,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-4xl font-black text-white neon-text",
                                                                children: [
                                                                    "$",
                                                                    trackData.sharePrice
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/60",
                                                                children: "per share"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-4 text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 bg-white/5 rounded-xl",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-2xl font-bold text-purple-400",
                                                                        children: trackData.backers
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-white/60",
                                                                        children: "Backers"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 701,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 bg-white/5 rounded-xl",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-2xl font-bold text-orange-400",
                                                                        children: trackData.daysLeft
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 704,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-white/60",
                                                                        children: "Days Left"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 707,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 703,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 bg-white/5 rounded-xl",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-2xl font-bold text-green-400",
                                                                        children: [
                                                                            Math.round(fundingPercentage),
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 710,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-white/60",
                                                                        children: "Funded"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 713,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                                        value: fundingPercentage,
                                                        className: "h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm text-white/60",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "$",
                                                                    trackData.currentRaise.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 722,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "$",
                                                                    trackData.targetRaise.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 721,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 719,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "shares",
                                                                children: "Number of Shares"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 730,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "shares",
                                                                type: "number",
                                                                value: investmentAmount,
                                                                onChange: (e)=>setInvestmentAmount(parseInt(e.target.value) || 0),
                                                                min: 1,
                                                                max: trackData.availableShares
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 731,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-black/20 rounded-xl p-4 space-y-3 border border-white/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/80",
                                                                        children: "Shares"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 745,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-semibold",
                                                                        children: investmentAmount
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 746,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/80",
                                                                        children: "Price per share"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 751,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-semibold",
                                                                        children: [
                                                                            "$",
                                                                            trackData.sharePrice
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 752,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 750,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/80",
                                                                        children: "Platform fee (3%)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 757,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-semibold",
                                                                        children: [
                                                                            "$",
                                                                            (totalInvestment * 0.03).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 758,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 756,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border-t border-white/20 pt-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between font-bold text-lg",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white",
                                                                            children: "Total"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 764,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white",
                                                                            children: [
                                                                                "$",
                                                                                (totalInvestment * 1.03).toFixed(2)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                            lineNumber: 765,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                    lineNumber: 763,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        className: "w-full text-lg py-6 fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-bold neon-glow transform hover:scale-105 transition-all duration-300",
                                                        onClick: ()=>onPageChange("payment"),
                                                        children: "Invest in Track"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 728,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$487$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                                        children: [
                                                            "You'll own ",
                                                            investmentAmount,
                                                            " shares (",
                                                            (investmentAmount / trackData.totalShares * 100).toFixed(2),
                                                            "%) of this track's future revenue."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 781,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-4 border-t space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium",
                                                        children: "What you get:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "text-sm text-muted-foreground space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 797,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Revenue sharing from streams & sales"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 796,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 801,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Voting rights on remixes & features"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 800,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 805,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Exclusive behind-the-scenes content"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 804,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                        lineNumber: 809,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Early access to future releases"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                                lineNumber: 808,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                        lineNumber: 795,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                                lineNumber: 793,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                                lineNumber: 680,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                            lineNumber: 678,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/components/TrackDetailPage.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(TrackDetailPage, "2248SaOr0x+C56JINaYaHX70A3k=");
_c = TrackDetailPage;
var _c;
__turbopack_context__.k.register(_c, "TrackDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=0f59d_fholio-monorepo_apps_frontend_src_components_TrackDetailPage_tsx_ea49774b._.js.map
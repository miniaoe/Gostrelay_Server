const Router = require("@koa/router");

// Auth
const { user_login } = require("../Controllers/Auth/Login"); // 登录
const { get_register_url, user_register } = require("../Controllers/Auth/Register"); // 注册
const { get_reset_url, user_reset } = require("../Controllers/Auth/Forget"); // 重置

// Ticket
const { ticket, create_ticket, replay_ticket, close_ticket, ticket_content } = require("../Controllers/User/Ticket");

// User
const { user_info } = require("../Controllers/User/User");

//==========================

// Auth Router
const auth_router = new Router({ prefix: "/auth" });
// 用户登录
auth_router.post("/login", (ctx) => user_login(ctx));

// 用户注册
auth_router.post("/register", (ctx) => get_register_url(ctx));
auth_router.post("/register/:token", (ctx) => user_register(ctx));

// 重置密码
auth_router.post("/reset", (ctx) => get_reset_url(ctx));
auth_router.post("/reset/:token", (ctx) => user_reset(ctx));

//==========================

// User
const user_router = new Router({ prefix: "/user" });
// 用户信息
user_router.get("/", (ctx) => user_info(ctx));

//==========================

// Ticket Router
const ticket_router = new Router({ prefix: "/ticket" });
// 获取工单
ticket_router.get("/", (ctx) => ticket(ctx));
// 创建工单
ticket_router.post("/", (ctx) => create_ticket(ctx));
// 获取单个工单信息
ticket_router.get("/:ticket_id", (ctx) => ticket_content(ctx));
// 回复工单
ticket_router.post("/:ticket_id", (ctx) => replay_ticket(ctx));
// 关闭工单
ticket_router.patch("/:ticket_id", (ctx) => close_ticket(ctx));

module.exports = { auth_router, user_router, ticket_router };

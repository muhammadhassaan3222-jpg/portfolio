<?php
// Admin API: login, save content, change password. Needs PHP hosting (almost all shared hosts have it).
session_set_cookie_params(['httponly'=>true,'samesite'=>'Strict','secure'=>!empty($_SERVER['HTTPS'])]);
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function out($a,$c=200){ http_response_code($c); echo json_encode($a); exit; }
$authFile = __DIR__.'/auth.json';
$siteFile = dirname(__DIR__).'/js/site-data.js';
if (!file_exists($authFile)) {
  file_put_contents($authFile, json_encode(['user'=>'admin','hash'=>password_hash('Admin@123',PASSWORD_DEFAULT),'default'=>true]), LOCK_EX);
}
$auth = json_decode(file_get_contents($authFile), true);
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) $in = [];
$a = $_GET['a'] ?? '';

if ($a === 'ping') out(['ok'=>true,'auth'=>!empty($_SESSION['ok']),'default'=>!empty($auth['default'])]);
if ($a === 'login') {
  usleep(700000);
  if (hash_equals((string)$auth['user'], (string)($in['user'] ?? '')) && password_verify((string)($in['pass'] ?? ''), $auth['hash'])) {
    session_regenerate_id(true); $_SESSION['ok'] = 1;
    out(['ok'=>true,'default'=>!empty($auth['default'])]);
  }
  out(['ok'=>false], 401);
}
if ($a === 'logout') { session_destroy(); out(['ok'=>true]); }
if (empty($_SESSION['ok'])) out(['ok'=>false,'error'=>'auth'], 401);

if ($a === 'save') {
  $c = $in['content'] ?? null;
  if (!is_array($c)) out(['ok'=>false,'error'=>'bad'], 400);
  $js = count($c) ? 'window.SITE_OVERRIDE='.json_encode($c, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_HEX_TAG).";\n" : "window.SITE_OVERRIDE=null;\n";
  if (@file_put_contents($siteFile, $js, LOCK_EX) === false) out(['ok'=>false,'error'=>'write'], 500);
  out(['ok'=>true,'bytes'=>strlen($js)]);
}
if ($a === 'password') {
  $cur = (string)($in['current'] ?? ''); $user = trim((string)($in['user'] ?? '')); $pass = (string)($in['pass'] ?? '');
  if (!password_verify($cur, $auth['hash'])) out(['ok'=>false,'error'=>'current'], 403);
  if (strlen($user) < 3 || strlen($user) > 40 || strlen($pass) < 8) out(['ok'=>false,'error'=>'weak'], 400);
  file_put_contents($authFile, json_encode(['user'=>$user,'hash'=>password_hash($pass,PASSWORD_DEFAULT),'default'=>false]), LOCK_EX);
  out(['ok'=>true]);
}
out(['ok'=>false,'error'=>'unknown'], 404);

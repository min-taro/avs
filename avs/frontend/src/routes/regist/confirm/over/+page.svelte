<script>
  import { goto } from '$app/navigation';

  function goToLogin() {
      goto('/login');
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-center mb-6">メール認証完了</h2>
      <p class="text-sm text-gray-700 mb-3">
          おめでとうございます！メール認証が正常に完了しました。これで、あなたのアカウントは使用可能となりました。
      </p>
      <p class="text-sm text-gray-700 mb-6">
          引き続きサービスをご利用いただくために、以下のボタンからログインページへ進んでください。
      </p>
      <div class="flex justify-center">
          <button class="btn btn-primary" on:click={goToLogin}>ログインページへ</button>
      </div>
  </div>
</div>

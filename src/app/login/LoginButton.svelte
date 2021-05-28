<style>
    :root {
        --hover-border-color: #00000050;
        --text-border-color: #00000030;
    }

    .login {
        background-color: rgba(255, 196, 0, 0.836);
        width: 237px;
        height: 48px;
        transition: box-shadow 0.7s;
    }
    .login:hover {
        box-shadow: 0 0 0 1.5px #fff, 0 0 0 3.5px #dfdfdf;
        cursor: pointer;
    }

    .login-link {
        display: block;
        text-align: center;
        line-height: 48px;
        font-weight: 700;
        font-size: 20px;
        color: white;
        text-shadow: 1px 1px 1px var(--text-border-color);
    }

</style>

<script>
    export let href;

</script>

<div class="login">
    <a class="login-link" {href}> Login via Bungie </a>
</div>

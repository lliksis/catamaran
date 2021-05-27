<style>
    :root {
        --hover-border-color: #00000050;
        --text-border-color: #00000030;
    }

    .login {
        background-color: rgba(255, 196, 0, 0.836);
        width: 200px;
        height: 40px;
        border-radius: 5px;        
    }
    .login:hover {
        box-shadow: 0px 0px 0px 1px var(--hover-border-color);
        cursor: pointer;
    }

    .login-link {
        display: block;
        text-align: center;
        margin: auto;
        margin-top: auto;
        margin-bottom: auto;

        font-weight: 600;
        font-size: 15px;
        color: white;
        text-shadow: -0.5px 0 var(--text-border-color),
            0 0.5px var(--text-border-color), 0.5px 0 var(--text-border-color),
            0 -0.5px var(--text-border-color);
    }

</style>

<script>
    export let href;

</script>

<div class="login">
    <a class="login-link" {href}> Login via Bungie </a>
</div>

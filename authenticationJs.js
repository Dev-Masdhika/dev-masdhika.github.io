// Mengubah / Menghapus file script (js) ini dapat menyebabkan :

// 1. Terjadinya kerusakan atau error pada template
// 2. Hilangnya fungsi update atau perbaikan otomatis pada template
// 3. Tidak mendapatkan dukungan atau bantuan dari pembuat template

// Terima kasih telah menggunakan karya kami. :)

// Salam,
// Masdhika.com

// Terakhir Diperbarui : 07-05-2022 @10.32
const authenticationJs = () => {
  if (MasdhikaCom.blog.id.slice(0, -1) == atob(MasdhikaCom.blog.license) && (Elem('.', 'style').innerText).replaceAll('\t', '').replaceAll('\n-> ', '\n->').includes('Theme by Masdhika.com')) {
    // FIXED
    const Abbreviation = MasdhikaCom.plugin.authentication.abbreviation;
    const userLogin = Local('?', "userLogin");
    firebase.initializeApp(MasdhikaCom.plugin.authentication.firebaseConfig);
    Elem('*', ".pView").forEach(viewELEMENT => {
      const viewID = viewELEMENT.getAttribute('data-id'),
            viewREF = firebase.firestore().doc(`Post/PostID_${viewID}`);
      viewREF.onSnapshot(viewREF_DATA => {
        const viewREFDATA = viewREF_DATA.exists ? (viewREF_DATA.data().PostView || 0) : 0;
        const addData = viewELEMENT.getAttribute('data-add') === 'true';
        viewELEMENT.setAttribute('data-text', Abbreviation ? abbreviation(viewREFDATA) : viewREFDATA);
        if (addData) {
          viewELEMENT.setAttribute('data-add', false);
          viewELEMENT.setAttribute('data-text', Abbreviation ? abbreviation(viewREFDATA + 1) : viewREFDATA + 1);
          viewREF.set({ PostView: viewREFDATA + 1 }, { merge: true });
        }
      });
    });
    Elem('*', ".pLike").forEach(likeELEMENT => {
      const likeID = likeELEMENT.getAttribute('data-id'),
            likeAdd = likeELEMENT.getAttribute('data-add'),
            likeREF = firebase.firestore().doc(`Post/PostID_${likeID}`);
      if (likeAdd != 'false') {
        likeELEMENT.addEventListener('click', () => {
          likeREF.get().then(likeREF_DATA => {
            const likeREFDATA = likeREF_DATA.exists ? (likeREF_DATA.data().PostLike || 0) : 0;
            likeREF.set({ PostLike: likeREFDATA + 1 }, { merge: true });
          });
        });
      }
      likeREF.onSnapshot(likeREF_DATA => {
        const likeREFDATA = likeREF_DATA.exists ? (likeREF_DATA.data().PostLike || 0) : 0;
        Class('+', likeELEMENT, 'clap');
        setTimeout(() => Class('-', likeELEMENT, 'clap'), 1000);
        likeELEMENT.setAttribute('data-text', Abbreviation ? abbreviation(likeREFDATA) : likeREFDATA);
      });
    });
    Elem('*', ".voteMeReact > span").forEach(voteELEMENT => {
      const voteID = voteELEMENT.closest('.voteMeReact').getAttribute('data-id'),
            voteEMOTEID = voteELEMENT.getAttribute('id'),
            voteREF = firebase.firestore().doc(`Post/PostID_${voteID}`);
      voteELEMENT.addEventListener('click', () => {
        voteREF.get().then(voteREF_DATA => {
          const voteREFDATA = (voteREF_DATA.exists ? (voteREF_DATA.data().PostVote ? voteREF_DATA.data().PostVote[voteEMOTEID] : 0) : 0) || 0;
          voteREF.set({PostVote: {[voteEMOTEID]: voteREFDATA + 1}}, {merge: true})
        })
        Class('+', voteELEMENT, 'active')
        Class('+', voteELEMENT.closest('.voteMeReact'), 'done')
      }, {once: true})
      voteREF.onSnapshot(voteREF_DATA => {
        const voteREFDATA = (voteREF_DATA.exists ? (voteREF_DATA.data().PostVote ? voteREF_DATA.data().PostVote[voteEMOTEID] : 0) : 0) || 0;
        Class('-', voteELEMENT.closest('.voteMeReact'), 'wait')
        voteELEMENT.setAttribute('data-text', Abbreviation ? abbreviation(voteREFDATA) : voteREFDATA)
      })
    })
    Elem('*', ".commentBottom .commentLike").forEach(commentELEMENT => {
      const commentTOPID = commentELEMENT.closest('.commentBottom').getAttribute('data-id'),
            commentID = commentELEMENT.getAttribute('id'),
            commentREF = firebase.firestore().doc(`Post/PostID_${commentTOPID}`);
      commentELEMENT.addEventListener('click', () => {
        commentREF.get().then(commentREF_DATA => {
          var commentREFDATA = (commentREF_DATA.exists ? (commentREF_DATA.data().PostComment ? commentREF_DATA.data().PostComment[commentID] : 0) : 0) || 0;
          commentREF.set({PostComment: {[commentID]: commentREFDATA + 1}}, {merge: true})
        });
        Class('+', commentELEMENT, 'active');
      }, {once: true});

      commentREF.onSnapshot(commentREF_DATA => {
        var commentREFDATA = (commentREF_DATA.exists ? (commentREF_DATA.data().PostComment ? commentREF_DATA.data().PostComment[commentID] : 0) : 0) || 0;
        commentELEMENT.setAttribute('data-text', Abbreviation ? abbreviation(commentREFDATA) : commentREFDATA)
      });
    });

    // [Not Fixed]
    if (-1 !== location.href.indexOf('login.html')) {
      Elem('#', 'postBody').innerHTML = '<div class="postLoader"><div class="loader"><svg viewBox="25 25 50 50" width="42" height="42"><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div></div>'
      showNotif('Please Wait…', 'alert');
      firebase.auth().onAuthStateChanged(function (W) {
        if (W) {
          Local('+', 'userLogin', JSON.stringify({userName: W.displayName, userEmail: W.email, userPhoto: W.photoURL, userUid: W.uid}));
          Elem('#', 'postBody').innerHTML = "<div class='note'><p data-title='PERINGATAN!!'>Fitur ini masih dalam tahap uji coba (BETA).</p></div>";
          // COdenya dipindah dibawah sendiri
        } else {
          const postLoginHtml = `<div class="postLogin"><img src="${Elem('.', "link[rel^='icon']").getAttribute("href")}" class="custom-img"><div class="postLoginTitle">Welcome</div><div class="postLoginSubtitle">Please Sign-In to continue</div><button id="auth_google" class="button o" type="button" aria-label="Sign in with Google">Sign in with Google</button><div class="postLoginNote">*Layanan otentikasi akan membagikan nama, alamat email, dan gambar profil Anda.</div></div>`;
          Elem('#', 'postBody').innerHTML = postLoginHtml;
          loadLazy('.lazy', 'loaded');
          Local('-', "userLogin");
          Local('-', "Bookmark_Post");
          Elem('#', 'auth_google').addEventListener('click', (t) => {
            t.preventDefault();
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          });
        }
      });
    }

    if (userLogin) {
      const getUserID = JSON.parse(userLogin).userUid;
      const getUserImage = JSON.parse(userLogin).userPhoto;
      const getUserName = JSON.parse(userLogin).userName;
      const getUserEmail = JSON.parse(userLogin).userEmail;

      Elem('.', 'header .headerBot .R [data-target="onProfil"] img').setAttribute('src', getUserImage);
      Elem('.', '.headerProfil .accountHeader .accountPhoto img').setAttribute('src', getUserImage);
      Elem('.', '.headerProfil .accountHeader .accountInfo .accountInfoName').innerText = getUserName;
      Elem('.', '.headerProfil .accountHeader .accountInfo .accountInfoEmail').innerText = getUserEmail;
      
      firebase.firestore().collection("User").doc(getUserID).collection('bookmarkPost').onSnapshot((bookmark_DATA) => {
        Elem('*', '.pBookmark').forEach(t => {
          t.removeAttribute('data'), Class('-', t, 'a'), Class('-', t, 'hidden');
        });
        if (bookmark_DATA.docs.length > 0) {
          var ambilaku = '<h2 class="widgetTitle">Bookmark Postingan</h2><div class="blogPts blogPosting M">';
          bookmark_DATA.docs.forEach((USER_DATA) => {
            var userDATA = USER_DATA.data();                 
            Elem('*', '.pBookmark[data-id="' + userDATA.id + '"]').forEach(t => {
              const viewPost = Class('?', t.closest('article'), 'onPost');
              if (viewPost) t.querySelector('span').setAttribute('data-hint', 'Hapus dari Bookmark');
              t.setAttribute('data', 'Delete'), Class('+', t, 'a');
            });
            if (-1 !== location.href.indexOf('bookmark.html')) {
              var postId = userDATA.id,
                  postLink = userDATA.link,
                  postImage = userDATA.image,
                  postTitle = userDATA.title,
                  postSnippet = userDATA.snippet,
                  postLabel = userDATA.label,
                  postTime = userDATA.time,
                  postComment = userDATA.comment,
                  addnih = '';
              addnih += `<article class='onMulti'><div class='postImage'><a aria-label='${postTitle}' class='thmb' href='${postLink}'><img alt='${postTitle}' class='lazy skeleton' data-src='${postImage}' src='data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='/></a><div class='postImageI T'>`;
              postLabel && postLabel.forEach(s => {
                addnih += `<a aria-label='${s}' data-text='${s}' href='/search/label/${s}' rel='tag'></a>`;
              });
              addnih += `<div class='postImageIL'></div><div class='postImageIR'><span class='pBookmark' data='ADD' data-id='${postId}' data-image='${postImage}' data-label='LABEL EDIT' data-title='${postTitle}' data-url='${postLink}'><svg class='inMarked line' viewBox='0 0 24 24'><path d='M12,2.5c-6.4,0-7.5.9-7.5,8.4S4.4,21.5,6,21.5s4.2-3.7,6-3.7,4.4,3.7,6,3.7,1.5-2.2,1.5-10.6S18.4,2.5,12,2.5ZM12,6v6m3-3H9'></path></svg><svg class='unMarked' viewBox='0 0 24 24'><path d='M16.8,1.9H7.2A4,4,0,0,0,3.3,5.8V19.9c0,1.8,1.3,2.5,2.9,1.7l4.9-2.8a2.8,2.8,0,0,1,1.8,0l4.9,2.8c1.6.8,2.9.1,2.9-1.7V5.8A3.9,3.9,0,0,0,16.8,1.9Zm-.3,6.8-5.1,5-.6.3a.9.9,0,0,1-.7-.3L8.2,11.8a1,1,0,0,1,0-1.3,1,1,0,0,1,1.4,0l1.2,1.2,4.3-4.4a1.2,1.2,0,0,1,1.4,0A1.2,1.2,0,0,1,16.5,8.7Z'></path></svg></span>${postComment > 0 ? (`<a class='pComment' data-text='${parseInt((TEST[o].link[1].title).match(/\d+/)[0])}' href='${postLink}#comments' role='button'><svg class='line' viewBox='0 0 24 24'><path d='M19.1,19.1a10.2,10.2,0,0,1-11.3,2c-.6-.2-4.1.7-4.9,0s.2-4.3,0-4.9a10.2,10.2,0,0,1,2-11.3A10,10,0,0,1,19.1,19.1Z'></path></svg></a>`) : ``}</div></div><div class='postImageI B'><div class='postImageIL'><div class='pView' data-id='${postId}' data-text=''><svg class='line' viewBox='0 0 24 24'><path d='M15.9,12A3.9,3.9,0,1,1,12,8.1,3.8,3.8,0,0,1,15.9,12ZM.5,12c0,4.1,5.2,9.1,11.5,9.1s11.5-5,11.5-9.1S18.3,2.9,12,2.9.5,7.9.5,12Z'></path></svg></div><div class='pLike' data-add='false' data-id='${postId}' data-text=''><svg class='line' viewBox='0 0 24 24'><path d='M2.9,12.4c-1.1-3.3.2-7.5,3.7-8.6a4.9,4.9,0,0,1,5.5,1.7,4.6,4.6,0,0,1,5.4-1.7c3.5,1.1,4.7,5.3,3.7,8.6-1.7,5.4-7.5,8.1-9.1,8.1S4.6,17.8,2.9,12.4ZM15.8,7.6A2,2,0,0,1,17.7,10'></path></svg></div></div><div class='postImageIR'><div class='pRating' data-text=''><svg class='line' viewBox='0 0 24 24'><path d='M12,3C10,3,9.8,6.5,8.6,7.8s-5-.2-5.5,2,2.8,3,3.2,4.9-1.
              6,4.6.2,6S10.1,19,12,19s3.8,3,5.5,1.7-.3-4.1.2-6,3.8-2.6,3.2-4.9-4.2-.7-5.5-2S14,3,12,3Z' fill='#f8b704'></path></svg></div><div class='pTime' data-text=''><svg class='line' viewBox='0 0 24 24'><path d='M2.8,12c0,6.9,2.3,9.3,9.2,9.3s9.3-2.4,9.3-9.3S18.9,2.8,12,2.8,2.8,5.1,2.8,12Zm12.6,2L12,12V7.6'></path></svg></div></div></div></div><div class='pCntn'><h2 class='pTtl aTtl sml'><a class='skeleton' data-text='${postTitle}' href='${postLink}' rel='bookmark'>${postTitle}</a></h2><div class='pSnpt skeleton'><span class="hidden"><!--${postSnippet}--></span><time class='hidden' dateModified='${TEST[o].updated.$t}' datePublished='${TEST[o].published.$t}'></time></div>${MasdhikaCom.plugin.authorBlog.status ? `<div class='postInfo M'><div class='post-header Tooltip'><span class='Tooltip--Bottom' data-hint='${MasdhikaCom.plugin.authorBlog.defaultWrittenBy} ${MasdhikaCom.plugin.authorBlog.defaultName}'></span><div class='post-authorImage skeleton'><img alt='${MasdhikaCom.plugin.authorBlog.defaultName}' width='22'/></div><div class='post-author skeleton' data-text='${MasdhikaCom.plugin.authorBlog.defaultName}'>${MasdhikaCom.plugin.authorBlog.defaultName}</div></div><a aria-label='${MasdhikaCom.plugin.authorBlog.defaultTextMore}' class='postComment Tooltip skeleton' data-text='${MasdhikaCom.plugin.authorBlog.defaultTextMore}' href='${postLink}' role='button'><span class='Tooltip--Bottom' data-hint='${MasdhikaCom.plugin.authorBlog.defaultTextMore}'></span></a></div>` : ``}</div></article>`;
              ambilaku += addnih;
            }

          });
          ambilaku += '</div>';

          if (-1 !== location.href.indexOf('bookmark.html')) {
            Elem('.', '.blogCont .Blog').innerHTML = ambilaku;
            articleStyle();

            Elem('*', ".pBookmark").forEach(bookmarkELEMENT => {
              bookmarkELEMENT.addEventListener('click', () => {
                const bookmarkID = bookmarkELEMENT.getAttribute('data-id'),
                      bookmarkADD = bookmarkELEMENT.getAttribute('data'),
                      bookmarkREF = firebase.firestore().doc(`User/${getUserID}/bookmarkPost/${bookmarkID}`);
                if (bookmarkADD == "Delete") {
                  bookmarkREF.delete();
                  showNotif('Bookmark artikel berhasil dihapus', 'alert');
                  Elem('*', `.pBookmark[data-id="${bookmarkID}"]`).forEach(t => {
                    t.removeAttribute('data');
                    Class('-', t, 'a');
                  });
                }
              });
            });
          }
          Elem('.', '.bookmarkCount').setAttribute('data-text' , bookmark_DATA.docs.length)
        } else {
          if (-1 !== location.href.indexOf('bookmark.html')) {
            Elem('.', '.blogCont .Blog').innerHTML = 'kosong hayoo';
          }
          Elem('.', '.bookmarkCount').setAttribute('data-text' , '0')
        }

      });
      console.log('ini masalah load');

      Elem('*', ".pBookmark").forEach(bookmarkELEMENT => {
        bookmarkELEMENT.addEventListener('click', () => {
          const bookmarkID = bookmarkELEMENT.getAttribute('data-id'),
                bookmarkADD = bookmarkELEMENT.getAttribute('data'),
                bookmarkREF = firebase.firestore().doc(`User/${getUserID}/bookmarkPost/${bookmarkID}`),
                bookmarkArticle = Class('?', bookmarkELEMENT.closest('article'), 'onPost'),
                bookmarkSnippet = bookmarkArticle ? bookmarkELEMENT.closest('article').querySelector('.postBody noscript').outerHTML : bookmarkELEMENT.closest('article').querySelector('.pSnpt span.hidden').innerHTML,
                bookmarkComment = bookmarkELEMENT.closest('article').querySelector('.pComment')?.getAttribute('data-text') ?? 0,
                bookmarkTime = bookmarkELEMENT.closest('article').querySelector('.pComment')?.getAttribute('data-text') ?? 0,
                bookmarkJSON = [];

          bookmarkELEMENT.closest('article').querySelectorAll(bookmarkArticle ? '.breadcrumb .lb' : '.postImageI.T .postImageIL a').forEach((bookmarkJSON_DATA) => {
            bookmarkJSON.push(bookmarkJSON_DATA.ariaLabel);
          });

          if (bookmarkADD !== "Delete") {
            bookmarkREF.set({
              id: bookmarkID,
              image: bookmarkELEMENT.getAttribute('data-image'),
              link: bookmarkELEMENT.getAttribute('data-url'),
              title: bookmarkELEMENT.getAttribute('data-title'),
              snippet: bookmarkSnippet,
              label: bookmarkJSON,
              comment: parseInt(bookmarkComment),
              time: bookmarkTime
            }, { merge: true });
            showNotif('Artikel tersimpan di Bookmark', 'success');
            Elem('*', `.pBookmark[data-id="${bookmarkID}"]`).forEach(t => {
              if (bookmarkArticle) t.querySelector('span').setAttribute('data-hint', 'Hapus dari Bookmark');
              t.setAttribute('data', 'Delete'), Class('+', t, 'a');
            });
          } else {
            bookmarkREF.delete();
            showNotif('Bookmark artikel berhasil dihapus', 'alert');
            Elem('*', `.pBookmark[data-id="${bookmarkID}"]`).forEach(t => {
              t.removeAttribute('data');
              Class('-', t, 'a');
            });
          }
        });
      });
      console.log('pBookmark click');

    } else {
      Elem('*', ".pBookmark").forEach(bookmarkELEMENT => {
        bookmarkELEMENT.addEventListener('click', () => {
          showNotif('Mohon melakukan proses login terlebih dahulu.', 'alert');
        })
      });
      if (-1 !== location.href.indexOf('bookmark.html')) {
        showNotif('Mohon maaf, Anda belum melakukan login. Anda akan segera diarahkan ke halaman autentikasi dalam waktu 5 detik.', 'alert');
        setTimeout(() => {
          window.location.href = '/p/login.html';
        }, 5000);
      }
    }
    
  } else {
    DontRemoveIt(openAi('q7:eCv3^|yf1><hdQ'), openAi('^Cvc2"wU`/)r:dc6?X"6>$>AX'))
  }
}
